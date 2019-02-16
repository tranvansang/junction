import tensorflow as tf
import numpy as np
from sklearn.utils import shuffle
import string

def init_weight(Mi, Mo):
    return np.random.randn(Mi, Mo) / np.sqrt(Mi + Mo)

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
            comment_sentence = [0] + comment_sentence + [1]
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
            response_sentence = [0] + response_sentence + [1]
            responses.append(response_sentence)
        else:
            culled += 1

    print("Culled: " + str(culled))
    return comments, responses

if __name__ == '__main__':
    tf.reset_default_graph()
    testTensor = tf.Variable(np.random.randn(2,2))
    word2idx = {'START': 0, 'END': 1, 'PAD': 2}
    comments, responses = process_comments("train.pb", "train.fr", word2idx)
    print("Comments length: " + str(len(comments)))
    print("Responses length: " + str(len(responses)))
    idx2word = {}
    for word in word2idx:
        idx2word[word2idx[word]] = word
    vocabsize = len(word2idx)

    comments = np.array(comments).astype(np.int32)
    responses = np.array(responses).astype(np.int32)
    comments, responses = shuffle(comments, responses)
    
    onehot = np.zeros((responses.size, 42, vocabsize))
    onehot[:,:,responses[:,:]] = 1
    responses = onehot

    N = comments.shape[0]
    batch_sz = 200
    n_batches = N // batch_sz
    
    #Make the recurrent cells
    recurrentLayerSizes = [1000, 750, 500, 250]
    recurrentLayers = []
    
    for i in recurrentLayerSizes:
        cell = tf.nn.rnn_cell.LSTMCell(i)
        recurrentLayers.append(cell)
    
    multiRNNCells = tf.nn.rnn_cell.MultiRNNCell(recurrentLayers)
    multiRNNCells = tf.nn.rnn_cell.DropoutWrapper(multiRNNCells, input_keep_prob=0.5)
    
    #Make the embeddings
    embeddingD = 500
    embedding = tf.Variable(init_weight(len(idx2word), embeddingD))
    embeddingToRNN = tf.Variable(init_weight(embeddingD, recurrentLayerSizes[0]))
    
    #Conversion to V-sized vocabulary with softmax
    Wout = tf.Variable(init_weight(recurrentLayerSizes[-1], len(idx2word)))
    bout = tf.Variable(np.zeros(len(idx2word)))
    
    #Input
    input_data = tf.placeholder(tf.int32, [200, 42], name='input')
    targets = tf.placeholder(tf.int32, [200, 42], name='targets')
    
    #Conversion of input to embedding
    XW = tf.nn.embedding_lookup(embedding, input_data)
    XW = tf.reshape(XW, [200 * 42, 500])
    recurrentInput = tf.matmul(XW, embeddingToRNN)
    recurrentInput = tf.reshape(recurrentInput, [200, 42, recurrentLayerSizes[0]])
    
    #recurrence
    recuOutput, _ = tf.nn.dynamic_rnn(multiRNNCells, recurrentInput, dtype=tf.float64)
    shape = tf.shape(recuOutput)
    
    recuOutput = tf.reshape(recuOutput, [shape[0] * shape[1], recurrentLayerSizes[-1]])
    
    logits = tf.matmul(recuOutput, Wout) + bout
    tf.matmul(logits, testTensor)
    cost = tf.reduce_sum(tf.nn.softmax_cross_entropy_with_logits_v2(logits=logits, labels=targets))
    train_op = tf.train.RMSPropOptimizer(0.000001, decay=0.99, momentum=0.9).minimize(cost)
    predict_op = tf.argmax(logits, 1)
    
    init = tf.global_variables_initializer()
    saver = tf.train.Saver()
    with tf.Session() as session:
        session.run(init)
        print('Yes')
        for i in range(100):
            print('Yes')
            for j in range(n_batches):
                print('Yes')
                Xbatch = comments[j*batch_sz:(j*batch_sz + batch_sz),]
                Ybatch = responses[j*batch_sz:(j*batch_sz + batch_sz),]
                print(Ybatch.shape)

                session.run(train_op, feed_dict={input_data: Xbatch, targets: Ybatch})
            if i % 5 == 0:
                test_cost = session.run(cost, feed_dict={input_data: comments, targets: responses, target_sequence_length: 40})
                prediction = session.run(inference_logits, feed_dict={input_data: Xbatch})
                err = error_rate(prediction, Ytest)
                print("Cost / err at iteration i=%d, j=%d: %.3f / %.3f" % (i, j, test_cost, err))
            costs.append(test_cost)

            plt.plot(costs)
            plt.show()
            save_path = saver.save(session, "model")





















