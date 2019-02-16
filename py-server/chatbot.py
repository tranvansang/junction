import tensorflow as tf
import numpy as np
import sys

def init(graph):
    tf.reset_default_graph()
    init = tf.global_variables_initializer()
    session = tf.Session()
    #the next few lines load the model
    #i want to input obj here instead of 'model.meta' string
    saver = tf.train.import_meta_graph(graph)
    saver.restore(session,tf.train.latest_checkpoint('./'))
    session.run(init)
    graph = tf.get_default_graph()
    X = graph.get_tensor_by_name("X:0")
    previous_state = graph.get_tensor_by_name("prev_state:0")
    multiply_op = graph.get_tensor_by_name("multiply:0")
    state_op = graph.get_tensor_by_name("state:0")
    return session, state


def chat(tupleSession, msg):
    (session, state) = tupleSession
    output, newState = session.run([multiply_op, state_op], feed_dict={X: inputValue, previous_state: state})
    return (session, newState), output

#our server
def main():
    graph = createBufferFromFileName('model.meta')
    sessionTuple = init(graph)
    while running:
        inputValue = np.array([sys.argv[1]])
        sessionTuple, output = chat(sessionTuple, inputValue)
        print(output)
