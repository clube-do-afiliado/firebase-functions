#!/bin/bash

FILE=functions/.env

# variables
ENV=${1:-$ENV}

touch $FILE
echo ENV=$ENV >> $FILE