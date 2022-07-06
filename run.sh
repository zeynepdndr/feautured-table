#!/bin/sh

# To run in production: source run pro

if [ "$1" = "dev" ]
then
    echo Running in $1 environment
    export NODE_ENV="development"
    # any development environment specific configurations goes here
elif [ "$1" = "pro" ]
then
    echo Running in $1 environment
    export NODE_ENV="production"
    # any production environment specific configurations goes here
fi

npm start