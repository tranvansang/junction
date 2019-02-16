import json
import os
import io
import string

def get_immediate_subdirectories(a_dir):
    return [name for name in os.listdir(a_dir) if os.path.isdir(os.path.join(a_dir, name))]

def build_vocabulary(comment_file, response_file):
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
                if t not in input_dict and t != 'newlinechar':
                    input_dict[t] = input_dict_size
                    input_dict_size += 1
            
            #Response Tokens
            for t in response_tokens:
                if t not in output_dict and t != 'newlinechar':
                    output_dict[t] = output_dict_size
                    output_dict_size += 1
        else:
            culled += 1

    with io.open('vocab.pb', 'a') as f:
    	for vocab in list(input_dict.keys()):
    		f.write(vocab+'\n')

    with io.open('vocab.fr', 'a') as f:
    	for vocab in list(output_dict.keys()):
    		f.write(vocab+'\n')

def generate_training():
	total = 0
	#Get the directories of the messaging data (each directory is history with one user)
	users = get_immediate_subdirectories('data')
	for user in users:
		with open('data/' + user + '/message.json', 'r') as file:
			messages = json.load(file)['messages']
			userOrder = [] #keeps track of order the user talks
			contents = [] #keeps track of the content corresponding to the user talking
			for message in reversed(messages):
				userOrder.append(message['sender_name'])
				contents.append(message['content'])

			#Let the person other than 'Frank' be the input, and 'Frank' be the target
			#If the message is less than 40 words and there are subsequent responses from the same user, combine them until it reaches < 40 and ignore the rest.

			actual_contents = []
			actual_order = []

			for user, content in zip(userOrder, contents):
				content = content.translate(str.maketrans('', '', string.punctuation))
				if len(actual_order) == 0 and user != 'Frank Wang':
					actual_contents.append(content)
					actual_order.append(user)
				elif len(actual_order) != 0 and user == actual_order[len(actual_order) - 1]:
					previous_content = actual_contents[len(actual_order) - 1]
					previous_length = len(previous_content.split())
					current_length = len(content.split())
					if previous_length + current_length < 40:
						actual_contents[len(actual_order) - 1] = previous_content + " " + content
				elif len(actual_order) != 0:
					actual_contents.append(content)
					actual_order.append(user)

			if actual_order[len(actual_order) - 1] != 'Frank Wang':
				del actual_order[-1]
				del actual_contents[-1]

			with io.open('train.pb','a') as f:
				for content, user in zip(actual_contents, actual_order):
					content = content.lower().rstrip()
					content = content.replace('\n', ' ')
					if user != 'Frank Wang':
						f.write(content+'\n')

			with io.open('train.fr','a') as f:
				for content, user in zip(actual_contents, actual_order):
					content = content.lower().rstrip()
					content = content.replace('\n', ' ')
					if user == 'Frank Wang':
						f.write(content+'\n')

#generate_training()
build_vocabulary("train.pb", "train.fr")