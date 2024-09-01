from fastapi import FastAPI,Request,Response,HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
import hashlib


goodmorning="https://api.quotable.io/random"
origins=["https://evs-wordle.netlify.app/"]


results=[]

app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
)
    
@app.get("/wakeup") # Method to keep backend server running while players play (shuts down in 15 mins of no activity)
def wakeup():
    m=requests.get(goodmorning)
    message=m.json()
    return {"message":message["content"],"author":message["author"]}

@app.post("/postscore")
async def check(request:Request):
    data = await request.json()
    score=0
    score+=(data["wins"]*100)
    score-=(data["guesses"]*0.5)
    score-=(data["time_taken"]*0.05)
    if(score<0):
        score=0
    
    res={"playerName":data["playerName"],"score":score}
    results.append(res)
    return res

@app.get("/getscores")
def returnScores():
    return results
   