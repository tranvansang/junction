#The code that loads the chatbot model and responds to user inputs
#Run it with python chatbot_loader.py. It will ask for input.

import tensorflow as tf
import numpy as np
import string
import random

def init():
    tf.reset_default_graph()
    init = tf.global_variables_initializer()
    session = tf.Session()
    saver = tf.train.import_meta_graph('model.meta')
    saver.restore(session,tf.train.latest_checkpoint('./'))
    session.run(init)
    
    return session

#word2idx and idx2word are dictionaries that convert word to number and number to word
def chat(session, inputValue, word2idx, idx2word):
    graph = tf.get_default_graph()
    input_data = graph.get_tensor_by_name("input:0")
    predict_op = graph.get_tensor_by_name("predict:0")
    inputValue = remove_punctuation(inputValue.lower()).split()
    
    #process input
    for i in range(len(inputValue)):
        if inputValue[i] in word2idx:
            inputValue[i] = word2idx[inputValue[i]]
        else:
            inputValue[i] = random.randrange(0, len(word2idx))
    
    for i in range(11 - len(inputValue)):
        inputValue.append(word2idx['PAD'])
    inputValue = inputValue[0:11]
    
    inputValue = np.array(inputValue)
    inputValue = np.reshape(inputValue, [1, inputValue.size])
    
    #input the message to the model
    output = session.run(predict_op, feed_dict={input_data: inputValue})
    
    #processes the output message
    output = np.reshape(output, [inputValue.size])
    outputString = ''
    for word in output:
        outputString = outputString + " " + idx2word[word]
    
    return session, outputString

def remove_punctuation(s):
    return s.translate(str.maketrans('', '', string.punctuation))

def get_dictionary():
    
    #retrieves dictionary necessary to convert between words and vectors
    word2idx = {'START': 0, 'END': 1, 'PAD': 2}
    current_idx = 3
    for line in open('robert_frost.txt'):
        line = line.strip()
        if line:
            tokens = remove_punctuation(line.lower()).split()
            for t in tokens:
                if t not in word2idx:
                    word2idx[t] = current_idx
                    current_idx += 1
    
    return word2idx

def main():
    word2idx = get_dictionary()
    idx2word = {}
    for word in word2idx:
        idx2word[word2idx[word]] = word
    
    session = init()
    while True:
        inputValue = input("please input message: ")
        sessionTuple, output = chat(session, inputValue, word2idx, idx2word)
        print("output: " + str(output))


main()