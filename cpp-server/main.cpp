#include <iostream>
#include <Python.h>
#include "httplib.h"
#include <unistd.h>
#include <cstdlib>
#include "ChInvokePython.h"

using namespace httplib;

int main(){
	ChInvokePython *pChInvokePython = new ChInvokePython();
	Server Svr;
	
	Svr.Post("/init", [](const auto& req, auto& res) {
        //res.set_content(req.body(), "text/plain");
    });

	Svr.Get("/chat", [](const auto& req, auto& res) {
        res.set_content("Hai this is good to get", "text/plain");
    });

	std::string output_result = pChInvokePython->executeChat(1234578,"hai");
	std::cout <<"OUTPUT="<< output_result <<std::endl;
	delete pChInvokePython;
	return 0;	
}