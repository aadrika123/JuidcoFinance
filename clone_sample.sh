#!/bin/sh

GITHUB_REPO="aadrika123/JuidcoFinance"
GITHUB_BRANCH=main


GITHUB_USER=viizz29
GITHUB_TOKEN=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




cloneRepo(){
    #  git clone -b main https://viizz29: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@github.com/aadrika123/JuidcoFinance
    git clone -b $GITHUB_BRANCH https://$GITHUB_USER:$GITHUB_TOKEN@github.com/$GITHUB_REPO

}

cloneRepo
