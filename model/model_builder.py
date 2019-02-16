import tensorflow as tf
import numpy as np

inputValue = np.array([3])

testVariable = tf.Variable(np.random.randn(3,3))
X = tf.placeholder(tf.float32, shape=(1), name='X')
prev_state = tf.placeholder(tf.float32, shape=(1), name='prev_state')

state = tf.math.add(prev_state, 2, name='state_op')
operation = tf.multiply(X, state, name='multiply_op')

init = tf.global_variables_initializer()
saver = tf.train.Saver()
with tf.Session() as session:
    session.run(init)
    save_path = saver.save(session, "model")