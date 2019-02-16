import tensorflow as tf
import numpy as np
from sklearn.utils import shuffle
import string


def print_sentence(sentence, dictionary):
    printed_sentence = []
    for i in sentence:
        printed_sentence.append(dictionary[i])
    print(printed_sentence)


def remove_punctuation(s):
    return s.translate(str.maketrans('', '', string.punctuation))


def process_comments(comment_file, response_file, dictionary):
    comments, responses = [], []
    dict_size = len(dictionary)
    culled = 0

    for comment, response in zip(open(comment_file), open(response_file)):
        comment, response = comment.strip(), response.strip()
        if comment and response:
            comment_tokens = remove_punctuation(comment.lower()).split()
            response_tokens = remove_punctuation(response.lower()).split()
            comment_sentence, response_sentence = [], []

            # Comment Tokens
            for t in comment_tokens:
                if t not in word2idx and t != 'newlinechar':
                    dictionary[t] = dict_size
                    dict_size += 1
                if t != 'newlinechar':
                    comment_sentence.append(dictionary[t])
            for i in range(40 - len(comment_sentence)):
                	comment_sentence.append(dictionary['PAD'])
            comment_sentence = comment_sentence[0:40]
            comments.append(comment_sentence)

            # Response Tokens
            for t in response_tokens:
                if t not in word2idx and t != 'newlinechar':
                    dictionary[t] = dict_size
                    dict_size += 1
                if t != 'newlinechar':
                    response_sentence.append(dictionary[t])
            for i in range(40 - len(response_sentence)):
                	response_sentence.append(dictionary['PAD'])
            response_sentence = response_sentence[0:40]
            responses.append(response_sentence)
        else:
            culled += 1

    print("Culled: " + str(culled))
    return comments, responses

def process_decoder_input(target_data, target_vocab_to_int, batch_size):
    # get '<GO>' id
    go_id = target_vocab_to_int['START']

    after_slice = tf.strided_slice(
        target_data, [0, 0], [batch_size, -1], [1, 1])
    after_concat = tf.concat([tf.fill([batch_size, 1], go_id), after_slice], 1)

    return after_concat


def encoding_layer(rnn_inputs, rnn_size, num_layers, keep_prob,
                   source_vocab_size,
                   encoding_embedding_size):
    """
    :return: tuple (RNN output, RNN state)
    """
    embed = tf.contrib.layers.embed_sequence(
        rnn_inputs, vocab_size=source_vocab_size, embed_dim=encoding_embedding_size)

    stacked_cells = tf.contrib.rnn.MultiRNNCell([tf.contrib.rnn.DropoutWrapper(
        tf.contrib.rnn.LSTMCell(rnn_size), keep_prob) for _ in range(num_layers)])

    outputs, state = tf.nn.dynamic_rnn(stacked_cells, embed, dtype=tf.float32)
    return outputs, state


def decoding_layer_train(encoder_state, dec_cell, dec_embed_input,
                         target_sequence_length, max_summary_length,
                         output_layer, keep_prob):
    """
    Create a training process in decoding layer
    :return: BasicDecoderOutput containing training logits and sample_id
    """
    dec_cell = tf.contrib.rnn.DropoutWrapper(dec_cell,
                                             output_keep_prob=keep_prob)

    # for only input layer
    helper = tf.contrib.seq2seq.TrainingHelper(dec_embed_input,
                                               target_sequence_length)

    decoder = tf.contrib.seq2seq.BasicDecoder(dec_cell,
                                              helper,
                                              encoder_state,
                                              output_layer)

    # unrolling the decoder layer
    outputs, _, _ = tf.contrib.seq2seq.dynamic_decode(decoder, impute_finished=True, maximum_iterations=max_summary_length)
    return outputs


def decoding_layer_infer(encoder_state, dec_cell, dec_embeddings, start_of_sequence_id,
                         end_of_sequence_id, max_target_sequence_length,
                         vocab_size, output_layer, batch_size, keep_prob):
    """
    Create a inference process in decoding layer
    :return: BasicDecoderOutput containing inference logits and sample_id
    """
    dec_cell = tf.contrib.rnn.DropoutWrapper(dec_cell,
                                             output_keep_prob=keep_prob)

    helper = tf.contrib.seq2seq.GreedyEmbeddingHelper(dec_embeddings,
                                                      tf.fill(
                                                          [batch_size], start_of_sequence_id),
                                                      end_of_sequence_id)

    decoder = tf.contrib.seq2seq.BasicDecoder(dec_cell,
                                              helper,
                                              encoder_state,
                                              output_layer)

    outputs, _, _ = tf.contrib.seq2seq.dynamic_decode(decoder,
                                                      impute_finished=True,
                                                      maximum_iterations=max_target_sequence_length)
    return outputs


def decoding_layer(dec_input, encoder_state,
                   target_sequence_length, max_target_sequence_length,
                   rnn_size,
                   num_layers, target_vocab_to_int, target_vocab_size,
                   batch_size, keep_prob, decoding_embedding_size):
    """
    Create decoding layer
    :return: Tuple of (Training BasicDecoderOutput, Inference BasicDecoderOutput)
    """
    target_vocab_size = len(target_vocab_to_int)
    dec_embeddings = tf.Variable(tf.random_uniform(
        [target_vocab_size, decoding_embedding_size]))
    dec_embed_input = tf.nn.embedding_lookup(dec_embeddings, dec_input)

    cells = tf.contrib.rnn.MultiRNNCell(
        [tf.contrib.rnn.LSTMCell(rnn_size) for _ in range(num_layers)])

    with tf.variable_scope("decode"):
        output_layer = tf.layers.Dense(target_vocab_size)
        train_output = decoding_layer_train(encoder_state,
                                            cells,
                                            dec_embed_input,
                                            target_sequence_length,
                                            max_target_sequence_length,
                                            output_layer,
                                            keep_prob)

    with tf.variable_scope("decode", reuse=True):
        infer_output = decoding_layer_infer(encoder_state,
                                            cells,
                                            dec_embeddings,
                                            target_vocab_to_int['START'],
                                            target_vocab_to_int['END'],
                                            max_target_sequence_length,
                                            target_vocab_size,
                                            output_layer,
                                            batch_size,
                                            keep_prob)

    return (train_output, infer_output)


def seq2seq_model(input_data, target_data, keep_prob, batch_size,
                  target_sequence_length,
                  max_target_sentence_length,
                  source_vocab_size, target_vocab_size,
                  enc_embedding_size, dec_embedding_size,
                  rnn_size, num_layers, target_vocab_to_int):
    """
    Build the Sequence-to-Sequence model
    :return: Tuple of (Training BasicDecoderOutput, Inference BasicDecoderOutput)
    """
    enc_outputs, enc_states = encoding_layer(input_data,
                                             rnn_size,
                                             num_layers,
                                             keep_prob,
                                             source_vocab_size,
                                             enc_embedding_size)

    dec_input = process_decoder_input(target_data,
                                      target_vocab_to_int,
                                      batch_size)

    train_output, infer_output = decoding_layer(dec_input,
                                               enc_states,
                                               target_sequence_length,
                                               max_target_sentence_length,
                                               rnn_size,
                                              num_layers,
                                              target_vocab_to_int,
                                              target_vocab_size,
                                              batch_size,
                                              keep_prob,
                                              dec_embedding_size)

    return train_output, infer_output


if __name__ == '__main__':
    word2idx = {'START': 0, 'END': 1, 'PAD': 2}
    comments, responses = process_comments("train.pb", "train.fr", word2idx)
    print("Comments length: " + str(len(comments)))
    print("Responses length: " + str(len(responses)))
    idx2word = {}
    for word in word2idx:
        idx2word[word2idx[word]] = word

    comments = np.array(comments).astype(np.int32)
    responses = np.array(responses).astype(np.int32)

    comments, responses = shuffle(comments, responses)

    N = comments.shape[0]
    batch_sz = 200
    n_batches = N // batch_sz

    source_int_text, target_int_text = comments, responses
    source_vocab_to_int, target_vocab_to_int = word2idx, word2idx
    max_target_sentence_length = max(
        [len(sentence) for sentence in source_int_text])

    train_graph = tf.Graph()
    with train_graph.as_default():
    
        input_data = tf.placeholder(tf.int32, [None, None], name='input')
        targets = tf.placeholder(tf.int32, [None, None], name='targets')
        target_sequence_length = tf.placeholder(tf.int32, [None], name='target_sequence_length')
        max_target_len = tf.reduce_max(target_sequence_length)
    
        lr = 0.000001
        keep_prob = 0.2

        train_logits, inference_logits = seq2seq_model(tf.reverse(input_data, [-1]), targets, keep_prob, 200,
	                                                   target_sequence_length,
	                                                   max_target_len,
	                                                   len(source_vocab_to_int),
	                                                   len(target_vocab_to_int),
	                                                   200,
	                                                   200,
	                                                   200,
	                                                   3,
	                                                   target_vocab_to_int)
        
        training_logits = tf.identity(train_logits.rnn_output, name='logits')
        inference_logits = tf.identity(inference_logits.sample_id, name='predictions')

	    # https://www.tensorflow.org/api_docs/python/tf/sequence_mask
	    # - Returns a mask tensor representing the first N positions of each cell.
        masks = tf.sequence_mask(target_sequence_length,
	                             max_target_len, dtype=tf.float32, name='masks')

        with tf.name_scope("optimization"):
	        # Loss function - weighted softmax cross entropy
	        cost = tf.contrib.seq2seq.sequence_loss(
	            training_logits,
	            targets,
	            masks)

	        # Optimizer
	        optimizer = tf.train.AdamOptimizer(lr)

	        # Gradient Clipping
	        gradients = optimizer.compute_gradients(cost)
	        capped_gradients = [(tf.clip_by_value(grad, -1., 1.), var)
	                             for grad, var in gradients if grad is not None]
	        train_op = optimizer.apply_gradients(capped_gradients)

        init = tf.global_variables_initializer()
        saver = tf.train.Saver()
        with tf.Session() as session:
            session.run(init)
            
            for i in range(100):
                for j in range(n_batches):
                    print('Yes')
                    Xbatch = comments[j*batch_sz:(j*batch_sz + batch_sz),]
                    Ybatch = responses[j*batch_sz:(j*batch_sz + batch_sz),]
    
                    session.run(train_op, feed_dict={input_data: Xbatch, targets: Ybatch, target_sequence_length: np.array([40])})
#                if i % 5 == 0:
#                    test_cost = session.run(cost, feed_dict={input_data: comments, targets: responses, target_sequence_length: 40})
#                    prediction = session.run(inference_logits, feed_dict={input_data: Xbatch})
#                    err = error_rate(prediction, Ytest)
#                    print("Cost / err at iteration i=%d, j=%d: %.3f / %.3f" % (i, j, test_cost, err))
#                costs.append(test_cost)
#
#            plt.plot(costs)
#            plt.show()
#            save_path = saver.save(session, "model")





















