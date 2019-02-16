import tensorflow as tf
import numpy as np
import sys

def init():
    tf.reset_default_graph()
    init = tf.global_variables_initializer()
    session = tf.Session()
    #the next few lines load the model
    #i want to input obj here instead of 'model.meta' string
    saver = tf.train.import_meta_graph('model.meta')
    saver.restore(session,tf.train.latest_checkpoint('./'))
    session.run(init)
    
    return session

def chat(session, currentState, inputValue):
	graph = tf.get_default_graph()
	X = graph.get_tensor_by_name("X:0")
	previous_state = graph.get_tensor_by_name("prev_state:0")
	multiply_op = graph.get_tensor_by_name("multiply_op:0")
	state_op = graph.get_tensor_by_name("state_op:0")
	output, newState = session.run([multiply_op, state_op], feed_dict={X: inputValue, previous_state: currentState})
	return (session, newState), output

def main():
    session = init()
    newState = np.array([2]).astype(np.float32)
    sessionTuple = (session, newState)
    while True:
        inputValue = np.array([int(input())])
        sessionTuple, output = chat(*sessionTuple, inputValue)
        print("output: " + str(output))
        print("newState: " + str(sessionTuple[1]))


main()