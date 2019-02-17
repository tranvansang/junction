CC                  = g++
SRC_DIR             = ""
OBJ_DIR             = libs
MAIN_EXE            = final
MAIN_EXE_NAME  		= main 
MAIN_EXE_FILE		= $(MAIN_EXE)/main
LOG_FILE  			= output.txt
REDIRECT_COMMAND 	= 2>&1 | tee -a
SRC_FILES           = $(wildcard *.cpp)
OBJ_FILES           = $(patsubst %.cpp,%.o,$(SRC_FILES))
OBJ_FILES_WITH_PATH = $(patsubst %.cpp,$(OBJ_DIR)/%.o,$(SRC_FILES))
MKDIR_P             = mkdir -p
MAKE_OBJ_DIR        = if [ ! -d "$(OBJ_DIR)/" ]; then  $(MKDIR_P) $(OBJ_DIR); fi; 
MAKE_MAIN_EXE_DIR   = if [ ! -d "$(MAIN_EXE)/" ]; then $(MKDIR_P) $(MAIN_EXE); fi;
CCFLAGS             = -g -DEBUG -I../ -pthread -L/usr/lib/x86_64-linux-gnu/   -lpthread -ldl -lutil -lm  -Xlinker -export-dynamic -I/usr/include/python3.6m/  -lpython3.6m 
#CCFLAGS 			= -g -DEBUG -I /usr/include/python3.5/ -I /usr/lib/python3.5/config-3.5m-x86_64-linux-gnu/ -c -w -lpython3.5 -lpthread -ldl -lutil -lm  -Xlinker -export-dynamic
CORE_FILE 			= core

build-and-run: compile run

all:compile

compile:directory main

run:
	@ ulimit -c unlimited #generate core files in ubuntu
	@ ./$(MAIN_EXE_FILE)	

directory:
	@ $(RM) $(LOG_FILE)
	@ touch $(LOG_FILE) 
	@ $(MAKE_MAIN_EXE_DIR)
	@ $(MAKE_OBJ_DIR) 


main:build_objects build_main
	
build_objects:$(OBJ_FILES)

build_main:
	
	@echo "building main" $^ $(REDIRECT_COMMAND) $(LOG_FILE)
	@ $(CC) $(CCFLAGS) -o $(MAIN_EXE_FILE) $(/usr/bin/python3.6-config --ldflags)  $(OBJ_FILES_WITH_PATH)  $(REDIRECT_COMMAND) $(LOG_FILE)

$(OBJ_FILES):
	
	@echo "compiling" $*.cpp $(REDIRECT_COMMAND) $(LOG_FILE)
	@ $(CC)  $(CCFLAGS) -c  $*.cpp -o $(OBJ_DIR)/$@   $(REDIRECT_COMMAND)  $(LOG_FILE)

.PHONY:	clean
	
clean:
	@ echo "cleaning object files"
	@ $(RM) -rf $(OBJ_FILES_WITH_PATH)
	@ echo "cleaning main exe file"
	@ $(RM) -rf $(MAIN_EXE_FILE)
	@ echo "cleaning log file"
	@ $(RM) -rf $(LOG_FILE)
	@ echo "cleaning core file"
	@ $(RM) -rf $(CORE_FILE)