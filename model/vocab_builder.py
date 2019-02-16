#Code adapted from https://github.com/lazyprogrammer/machine_learning_examples.git

import tensorflow as tf
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
            
            #Comment Tokens
            for t in comment_tokens:
                if t not in word2idx and t != 'newlinechar':
                    dictionary[t] = dict_size
                    dict_size += 1
                if t != 'newlinechar':
                    comment_sentence.append(dictionary[t])
            comments.append(comment_sentence)
            
            #Response Tokens
            for t in response_tokens:
                if t not in word2idx and t != 'newlinechar':
                    dictionary[t] = dict_size
                    dict_size += 1
                if t != 'newlinechar':
                    response_sentence.append(dictionary[t])
            responses.append(response_sentence)
        else:
            culled += 1
    
    print("Culled: " + str(culled))
    return comments, responses

def build_dictionaries(comment_file, response_file):
    input_dict = {}
    output_dict = {}
    comments, responses = [], []
    input_dict_size = 0
    output_dict_size = 0
    culled = 0
            
    for comment, response in zip(open(comment_file), open(response_file)):
        comment, response = comment.strip(), response.strip()
        if comment and response:
            comment_tokens = comment.split()
            response_tokens = response.split()
            comment_sentence, response_sentence = [], []
            
            #Comment Tokens
            for t in comment_tokens:
                if t not in word2idx and t != 'newlinechar':
                    input_dict[t] = input_dict_size
                    input_dict_size += 1
            
            #Response Tokens
            for t in response_tokens:
                if t not in word2idx and t != 'newlinechar':
                    output_dict[t] = output_dict_size
                    output_dict_size += 1
        else:
            culled += 1
    
    print("Culled: " + str(culled))
    return input_dict, output_dict

if __name__ == '__main__':
    word2idx = {'START': 0, 'END': 1}
    comments, responses = process_comments("train.pb", "train.fr", word2idx)
    print("Comments length: " + str(len(comments)))
    print("Responses length: " + str(len(responses)))
    idx2word = {}
    for word in word2idx:
        idx2word[word2idx[word]] = word
    
    # print("First comment and responses:")
    # print_sentence(comments[0], idx2word)
    # print_sentence(responses[0], idx2word)
    
    # print("Other comment and responses:")
    # print_sentence(comments[100], idx2word)
    # print_sentence(responses[100], idx2word)

    input_dict, output_dict = build_dictionaries("train.pb", "train.fr")
    with io.open('train.pb','a') as f:
        for content, user in zip(actual_contents, actual_order):
            content = content.lower()
            if user != 'Frank Wang':
                f.write(content+'\n')

    with io.open('train.pb','a') as f:
        for content, user in zip(actual_contents, actual_order):
            content = content.lower()
            if user != 'Frank Wang':
                f.write(content+'\n')















