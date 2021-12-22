'''
Description : Code for designing the neural network archiecture for road_indexing. 
Output : Model and other important stuff like loss , optimizer etc.
Last Modified : 30th April 2019
Author: Saurabh 
'''
import torch
import torch.utils.data as data_utils 

import pandas as pd
import numpy as np

import torch

import torch.utils.data as data_utils 

from torch.autograd import Variable

import matplotlib.pyplot as plot

import torch.nn.functional as F

from glob import glob

DEVICE = ("cuda:0" if torch.cuda.is_available()  else "cpu")

class ROAD_INDEXING_FFN_NET(torch.nn.Module):
    '''
    Class defines the neural network model for road_indexing
    '''
    def __init__(self,input_layer_size,hidden_layer_1_size,hidden_layer_2_size,hidden_layer_3_size,hidden_layer_4_size,hidden_layer_5_size,output_layer_size):
        '''
        Intializes various important variables

        Parameters:
        input_layer_size : No of neurons in the input layer 
        hidden_layer_1_size : No of neurons in the first hidden layer
        hidden_layer_3_size : No of neurons in the second hidden layer
        hidden_layer_3_size : No of neurons in the third hidden layer
        output_layer_size : No of neurons in the output layer

        Returns:
        None
        '''
        super(ROAD_INDEXING_FFN_NET,self).__init__()
        self.input_layer = torch.nn.Linear(input_layer_size,hidden_layer_1_size)
        self.hidden_layer_1 = torch.nn.Linear(hidden_layer_1_size,hidden_layer_2_size)
        self.hidden_layer_2 = torch.nn.Linear(hidden_layer_2_size,hidden_layer_3_size)
        self.hidden_layer_3 = torch.nn.Linear(hidden_layer_3_size,hidden_layer_4_size)
        self.hidden_layer_4 = torch.nn.Linear(hidden_layer_4_size,hidden_layer_5_size)
        self.hidden_layer_5 = torch.nn.Linear(hidden_layer_5_size,output_layer_size)
        self.relu = torch.nn.ReLU()
        self.sigmoid = torch.nn.Sigmoid()

    def forward(self,x):
        '''
        Describes the flow of the neural network

        Parameters:
        x: input

        Returns : 
        x: output of the network
        '''

        x=self.input_layer(x)
        x=self.relu(x)
        x=F.dropout(x, p=0.7,training=True)
        x=self.hidden_layer_1(x)
        x=self.relu(x)
        x=F.dropout(x, p=0.7,training=True)
        x=self.hidden_layer_2(x)
        x=self.relu(x)
        x=F.dropout(x, p=0.5,training=True)
        x=self.hidden_layer_3(x)
        x=self.relu(x)
        x=F.dropout(x, p=0.4,training=True)
        x=self.hidden_layer_4(x)
        x=self.relu(x)
        x=F.dropout(x, p=0.4,training=True)
        x=self.hidden_layer_5(x)

        return x

class ROAD_INDEXING_CNN_NET_1(torch.nn.Module):

    '''
    Class defines the neural network model for road_indexing
    '''
    def __init__(self,input_layer_size,hidden_layer_1_size,hidden_layer_2_size,hidden_layer_3_size,hidden_layer_4_size,output_layer_size):
        '''
        Intializes various important variables

        Parameters:
        input_layer_size : No of neurons in the input layer 
        hidden_layer_1_size : No of neurons in the first hidden layer
        hidden_layer_3_size : No of neurons in the second hidden layer
        hidden_layer_3_size : No of neurons in the third hidden layer
        output_layer_size : No of neurons in the output layer

        Returns:
        None
        '''
        super(ROAD_INDEXING_CNN_NET_1,self).__init__()
        self.cnn_1d_layer_1 = torch.nn.Conv1d(in_channels=1,out_channels=18,kernel_size=5)
        self.input_layer = torch.nn.Linear(input_layer_size,hidden_layer_1_size)
        self.hidden_layer_1 = torch.nn.Linear(hidden_layer_1_size,hidden_layer_2_size)
        self.hidden_layer_2 = torch.nn.Linear(hidden_layer_2_size,hidden_layer_3_size)
        self.hidden_layer_3 = torch.nn.Linear(hidden_layer_3_size,hidden_layer_4_size)
        # self.hidden_layer_4 = torch.nn.Linear(hidden_layer_4_size,hidden_layer_5_size)
        self.hidden_layer_4 = torch.nn.Linear(hidden_layer_4_size,output_layer_size)
        self.relu = torch.nn.ReLU()
        self.sigmoid = torch.nn.Sigmoid()
        self.maxpool1d = torch.nn.MaxPool1d(kernel_size=2)
        
    def forward(self,x):
        '''
        Describes the flow of the neural network

        Parameters:
        x: input

        Returns : 
        x: output of the network
        '''
        #Passing through CNN
        x = self.cnn_1d_layer_1(x)
        x = self.relu(x)
        x = self.maxpool1d(x)

        #Find Channels,height,width
        # print(x.data.size())
        (_,C,W)=x.data.size()
        # print(C,W)
        #Reshaping 2d to 1d
        x=x.view(-1,C*W)

        # print(x.size())
        x=self.input_layer(x)
        x=self.relu(x)
        x=F.dropout(x, p=0.7,training=True)
        x=self.hidden_layer_1(x)
        x=self.relu(x)
        x=F.dropout(x, p=0.7,training=True)
        x=self.hidden_layer_2(x)
        x=self.relu(x)
        x=F.dropout(x, p=0.5,training=True)
        x=self.hidden_layer_3(x)
        x=self.relu(x)
        x=F.dropout(x, p=0.4,training=True)
        x=self.hidden_layer_4(x)
        # x=self.relu(x)
        # x=F.dropout(x, p=0.4,training=True)
        # x=self.hidden_layer_5(x)

        return x

class ROAD_INDEXING_CNN_NET_2(torch.nn.Module):

    '''
    Class defines the neural network model for road_indexing
    '''
    def __init__(self,input_layer_size,hidden_layer_1_size,hidden_layer_2_size,hidden_layer_3_size,hidden_layer_4_size,output_layer_size):
        '''
        Intializes various important variables

        Parameters:
        input_layer_size : No of neurons in the input layer 
        hidden_layer_1_size : No of neurons in the first hidden layer
        hidden_layer_3_size : No of neurons in the second hidden layer
        hidden_layer_3_size : No of neurons in the third hidden layer
        output_layer_size : No of neurons in the output layer

        Returns:
        None
        '''
        super(ROAD_INDEXING_CNN_NET_2,self).__init__()
        self.cnn_1d_layer_1 = torch.nn.Conv1d(in_channels=1,out_channels=24,kernel_size=11,stride=4)
        self.cnn_1d_layer_2 = torch.nn.Conv1d(in_channels=24,out_channels=64,kernel_size=5,stride=1,padding=2)
        self.cnn_1d_layer_3 = torch.nn.Conv1d(in_channels=64,out_channels=96,kernel_size=3,stride=1,padding=1)
        self.cnn_1d_layer_4 = torch.nn.Conv1d(in_channels=96,out_channels=96,kernel_size=3,stride=1,padding=1)
        self.cnn_1d_layer_5 = torch.nn.Conv1d(in_channels=96,out_channels=64,kernel_size=3,stride=1,padding=1)

        self.input_layer = torch.nn.Linear(input_layer_size,hidden_layer_1_size)
        self.hidden_layer_1 = torch.nn.Linear(hidden_layer_1_size,hidden_layer_2_size)
        # self.hidden_layer_2 = torch.nn.Linear(hidden_layer_2_size,hidden_layer_3_size)
        # self.hidden_layer_3 = torch.nn.Linear(hidden_layer_3_size,hidden_layer_4_size)
        # self.hidden_layer_4 = torch.nn.Linear(hidden_layer_4_size,hidden_layer_5_size)
        self.hidden_layer_2 = torch.nn.Linear(hidden_layer_2_size,output_layer_size)
        self.relu = torch.nn.ReLU()
        self.leaky_relu = torch.nn.LeakyReLU()
        self.sigmoid = torch.nn.Sigmoid()
        self.maxpool1d = torch.nn.MaxPool1d(kernel_size=3,stride=2)
        self.batchnorm_1 = torch.nn.BatchNorm1d(24)
        self.batchnorm_2 = torch.nn.BatchNorm1d(64)
        self.batchnorm_3 = torch.nn.BatchNorm1d(96)
        self.dropout_1 = torch.nn.Dropout(0.7)
        self.dropout_2 = torch.nn.Dropout(0.3)
        
    def forward(self,x):
        '''
        Describes the flow of the neural network

        Parameters:
        x: input

        Returns : 
        x: output of the network
        '''
        #Passing through CNN

        x = self.cnn_1d_layer_1(x)
        x = self.relu(x)
        x = self.batchnorm_1(x)
        # x = torch.nn.functional.dropout2d(x,p=0.1,training=True)
        x = self.maxpool1d(x)

        x = self.cnn_1d_layer_2(x)
        x = self.relu(x)
        x = self.batchnorm_2(x)
        # x = torch.nn.functional.dropout2d(x,p=0.1,training=True)
        x = self.maxpool1d(x)

        x = self.cnn_1d_layer_3(x)
        x = self.relu(x)
        # x = torch.nn.functional.dropout2d(x,p=0.1,training=True)
        x = self.cnn_1d_layer_4(x)
        x = self.relu(x)
        # x = torch.nn.functional.dropout2d(x,p=0.1,training=True)
        x = self.cnn_1d_layer_5(x)
        x = self.relu(x)
        # x = self.batchnorm_2(x)
        # x = torch.nn.functional.dropout2d(x,p=0.1,training=True)

        x= self.maxpool1d(x)

        # x3 = self.cnn_1d_layer_1_3(x)
        # x3 = self.relu(x3)
        # x3 = self.maxpool1d(x3)

        #Find Channels,height,width
        # print(x.data.size())
        (_,C,W)=x.data.size()
        # print(C,W)
        #Reshaping 2d to 1d
        x=x.view(-1,C*W)

        # (_,C,W)=x2.data.size()
        # x2=x2.view(-1,C*W)

        # (_,C,W)=x3.data.size()
        # x3=x3.view(-1,C*W)

        # x = torch.cat((x1,x2,x3),1)

        #print(x.size())

        x=self.input_layer(x)
        x=self.relu(x)
        # x=F.dropout(x, p=0.7,training=True)
        x = self.dropout_1(x)
        x=self.hidden_layer_1(x)
        x=self.relu(x)
        # x=F.dropout(x, p=0.3,training=True)
        x = self.dropout_2(x)
        x=self.hidden_layer_2(x)
        # x=self.relu(x)
        # x=F.dropout(x, p=0.4,training=True)
        # x=self.hidden_layer_3(x)
        # x=self.relu(x)
        # x=F.dropout(x, p=0.3,training=True)
        # x=self.hidden_layer_4(x)
        # x=self.relu(x)
        # x=F.dropout(x, p=0.4,training=True)
        # x=self.hidden_layer_5(x)
        return x


class NET_REQUIREMENT():
    def __init__(self,batch_size,no_of_epoch,momentum):
        self.batch_size = batch_size
        # self.learning_rate = learning_rate
        self.no_of_epoch = no_of_epoch
        self.momentum = momentum
        
    
    def get_dataloader(self,features,labels):

        try:
            
            train_features = torch.Tensor(features)
            train_labels = torch.LongTensor(labels)

            if DEVICE == "cuda:0":
                train_features = train_features.to(DEVICE)
                train_labels = train_labels.to(DEVICE)
            else:
                pass

            train_data = data_utils.TensorDataset(train_features,train_labels)
            train_data_loader = data_utils.DataLoader(dataset=train_data,batch_size=self.batch_size,shuffle=True,drop_last=True)
        
        except Exception as e:

            print("data loader not properly working",e)

        return train_data_loader

    def get_criterion(self):
        return torch.nn.CrossEntropyLoss().cuda()
        # [0.000037504,0.000131961,0.000274123] saurabh weight
        # [0.000074438,0.00006398,0.000113456] laxman weight
        
    def get_optimizer(self,model,learning_rate=0.001,weight_decay=0):
        # optimizer = torch.optim.SGD(model.parameters(),lr=self.learning_rate, momentum=self.momentum, weight_decay = weight_decay)
        optimizer = torch.optim.Adam(model.parameters(), lr=learning_rate)
        return optimizer

def run():
    obj_window_data = window_data()
    




    