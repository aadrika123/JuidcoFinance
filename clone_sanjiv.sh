#!/bin/sh

GITHUB_REPO="aadrika123/JuidcoFinance"
GITHUB_BRANCH=sanjiv_dev


GITHUB_USER=sanjivgit
GITHUB_TOKEN=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


cloneRepo(){
    #  git clone -b sanjiv_dev https://sanjivgit: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@github.com/aadrika123/JuidcoFinance
    git clone -b $GITHUB_BRANCH https://$GITHUB_USER:$GITHUB_TOKEN@github.com/$GITHUB_REPO


    # git clone -b viizz_dev https://bp7788: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@github.com/aadrika123/JuidcoFinance

}

cloneRepo
