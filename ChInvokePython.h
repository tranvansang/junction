#ifndef CHINVOKEPYTHON
#define CHINVOKEPYTHON 

#include <Python.h>
#include <unistd.h>
#include <cstdlib>
#include <vector> 
#include <tupleobject.h>
//https://github.com/tranvansang/junction/tree/master/model

 struct chatBotParam{
		PyObject *pTFSession       = NULL;
		PyObject *pName            = NULL; 
		PyObject *pModule          = NULL; 
		PyObject *pFunc            = NULL;
		PyObject *pArgs            = NULL;
};

class ChInvokePython
{

public:
	//function to initialize the python environment
	ChInvokePython(){
		this->initEnv();
		createDictionary();
	}

	//delete all the memeory
	~ChInvokePython(){
		chatBotDataMap.clear();
		Py_FinalizeEx();
		PyDict_ClearFreeList();

	}

	std::string executeInit(int uid,std::string pythonLoader,std::string pythonModel){
		std::string outputString = invokeMethod(uid,0,"");
	}

	//function for executing the atcual chat function.
	std::string executeChat(int uid,std::string chatString){
		
		std::string outputString = invokeMethod(uid,0,chatString);
		 outputString = invokeMethod(uid,1,chatString);
		return outputString;		
	}

private:
	
	std::string pyLoad = "init";
	std::string pyChat = "chat";
	
	std::map<int,chatBotParam> chatBotDataMap;
	std::string homeDirectory  = "/home/adeeb2358/chatbot";
	PyObject *wordDictionary   = PyDict_New();
	PyObject *numberDictionary = PyDict_New();

	std::string words= "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";
	void createDictionary(){
		int j = 1;
		int result ;

		for(int i = 0; i < 2200;i++){
			result = PyDict_SetItem(this->wordDictionary,PyUnicode_FromString(words.substr(j,i).c_str()),PyLong_FromLong(i+j));
			std::cout <<"word dictionary"<< result;
			result = PyDict_SetItem(this->numberDictionary,PyLong_FromLong(i+j),PyUnicode_FromString(words.substr(j,i).c_str()));
			std::cout <<"number dictionary"<< result;	
			j++;
			if(j >= i){
				j = 0;	
			}	
		}
	}


	//init environment variables
	void initEnv(){
		setenv("PYTHONPATH", this->homeDirectory.c_str(), 1);
		setenv("PYTHONWARNINGS", "ignore", 1);
		Py_Initialize();	
	}
	
	std::string invokeMethod(int uid ,int type,std::string chatString = "" /*fot load type 0for chat type 1*/){
		std::string initString = this->homeDirectory+"/"+std::to_string(uid);
		int result = chdir(initString.c_str());
			PyObject *pArgs    = NULL;
			pArgs   = PyTuple_New(2);
		
		std::string functionName = this->pyLoad;
		
		if(type == 1){
			functionName = this->pyChat;
			if(this->chatBotDataMap[uid].pTFSession == NULL){
				return "NO_TFSESSION_LOADED";
			}
		
			std::cout <<"SessionOutput"<< this->chatBotDataMap[uid].pTFSession << std::endl;
			PyTuple_SetItem(pArgs,1,this->chatBotDataMap[uid].pTFSession); 
			PyTuple_SetItem(pArgs,2,PyUnicode_FromString(chatString.c_str()));
		 //	PyTuple_SetItem(pArgs,3,this->wordDictionary);
		 //	PyTuple_SetItem(pArgs,4,this->numberDictionary);
		
			
		}else{

			if(this->chatBotDataMap[uid].pTFSession != NULL){
				return "ALREAD_LOADED";
			}
		}

		
		
		if(this->chatBotDataMap[uid].pName == NULL){
			
			PyRun_SimpleString(("import sys; sys.path.append('"+initString+"/')").c_str());
			this->chatBotDataMap[uid].pName = PyUnicode_DecodeFSDefault(std::to_string(uid).c_str());
		}
		
		if (this->chatBotDataMap[uid].pModule == NULL) {
        	this->chatBotDataMap[uid].pModule = PyImport_Import(this->chatBotDataMap[uid].pName);
        }
		
    	
		if (this->chatBotDataMap[uid].pModule == NULL) {
        	return	"FAILED_TO_LOAD_MODULE";
        }

        if(this->chatBotDataMap[uid].pFunc == NULL){
        	this->chatBotDataMap[uid].pFunc = PyObject_GetAttrString(this->chatBotDataMap[uid].pModule, functionName.c_str());
        }

        if(this->chatBotDataMap[uid].pFunc == NULL){
        	return "FUNCTION_NOT_FOUND";
        }
        
        if (this->chatBotDataMap[uid].pFunc && PyCallable_Check(this->chatBotDataMap[uid].pFunc)) {
        	if(type == 0){
        		this->chatBotDataMap[uid].pTFSession = PyObject_CallObject(this->chatBotDataMap[uid].pFunc,NULL);
        	}else{
        		//std::cout <<"OUTPUT"<< PyObject_CallObject(this->chatBotDataMap[uid].pFunc, pArgs)<<std::endl;
        		PyObject *pVal = PyObject_CallObject(this->chatBotDataMap[uid].pFunc, pArgs);
        		//PyTuple_ClearFreeList();
        		if(pVal != NULL){
        			Py_DECREF(pVal);
        		}
        		
        		return "OK";
        	}
        	 
    		
			

        }else{
        	return "FUNCTION_NOT_CALLABLE";
        }
       
        return "OK";
    }    
        
};



#endif