from fastapi import FastAPI,Request
from fastapi.middleware.cors import CORSMiddleware
import random
import os

origins=["http://127.0.0.1:5500"]

words = os.environ.get('evs_words')
app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
)
def makeRandom():
    indeces=[]
    count=3
    while count!=0:
        r=random.randint(0,7)
        if r not in indeces:
            indeces.append(r)
            count=count-1
    return indeces

@app.get("/indeces")
def root():
    indeces=makeRandom()
    lengths=[]
    for i in range(0,3):
        lengths.append(len(words[indeces[i]]))
    return {"indeces":indeces,"lengths":lengths}

@app.post("/checkguess")
async def check(request:Request):
    data = await request.json()
    result=""
    # a means correct position, b means wrong position, c means does not exist in word
    ans=words[data.get("id")].lower()
    guess=data.get("u_guess").lower()
    print("Answer: "+ans)
    print(guess)
    length=len(ans)
    print(ans)
    correct=1
    for i in range(0,length):
        if(guess[i]==ans[i]):
            result+="a"
        elif(guess[i] in ans):
            result+="b"
            correct=0
        else:
            result+="c"
            correct=0
    return {"result":result,"correct":correct}
        