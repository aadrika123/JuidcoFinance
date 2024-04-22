#!/bin/sh

GITHUB_REPO="aadrika123/JuidcoFinance"
GITHUB_BRANCH=sanjiv_dev


GITHUB_USER=sanjivgit
GITHUB_TOKEN=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


cloneRepo(){
    #  git clone -b sanjiv_dev https://sanjivgit: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@github.com/aadrika123/JuidcoFinance
    git clone -b $GITHUB_BRANCH https://$GITHUB_USER:$GITHUB_TOKEN@github.com/$GITHUB_REPO

}

cloneRepo
