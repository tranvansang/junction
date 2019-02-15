import tensorflow as tf
import numpy as np

inputValue = np.array([3])

testVariable = tf.Variable(np.random.randn(3,3))
X = tf.placeholder(tf.float32, shape=(1), name='X')

operation = tf.multiply(X, 2, name='multiply')

init = tf.global_variables_initializer()
saver = tf.train.Saver()
with tf.Session() as session:
    session.run(init)
    output = session.run(operation, feed_dict={X: inputValue})
    print(output)
    save_path = saver.save(session, "model")