from fastapi import FastAPI,Request,Response,HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests

hashed_pwd="591480a6ffe66bae1081808a65f9924c96f96e5ef92f3aef751f954e99cd7c3f"
goodmorning="https://api.quotable.io/random"
origins=["https://evs-wordle.netlify.app/"]


results=[]

app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
)
@app.get("/auth")
def nope():
    raise HTTPException(status_code=401,detail="Not auth")
    
@app.get("/wakeup")
def wakeup():
    m=requests.get(goodmorning)
    message=m.json()
    return {"message":message["content"],"author":message["author"]}

@app.post("/postscore")
async def check(request:Request):
    data = await request.json()
    score=0
    score+=(data["wins"]*100)
    score-=(data["guesses"]*2)
    score-=(data["time_taken"]*0.5)
    if(score<0):
        score=0
    
    res={"playerName":data["playerName"],"score":score}
    results.append(res)
    return res

@app.get("/getscores")
def returnScores():
    return results
    
@app.get("/clearboard")
def clearBoard():

    results.clear()
    return {"Status":"Success"}        