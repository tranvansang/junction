import tensorflow as tf
import numpy as np

tf.reset_default_graph()

inputValue = np.array([3])

init = tf.global_variables_initializer()
with tf.Session() as session:
	saver = tf.train.import_meta_graph('model.meta')
	saver.restore(session,tf.train.latest_checkpoint('./'))
	session.run(init)
	graph = tf.get_default_graph()
	X = graph.get_tensor_by_name("X:0")
	multiply = graph.get_tensor_by_name("multiply:0")
	output = session.run(multiply, feed_dict={X: inputValue})
	print(output)