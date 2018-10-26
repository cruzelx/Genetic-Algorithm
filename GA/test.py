import random

def fitness(password,check):
    score=0
    for i in range(len(password)):
      if(password[i]==check[i]):
          score+=1
    return score/len(password)

def genIndiv(password):
    result=''
    for i in range(len(password)):
      result+=chr(int(97+26*random.random()))
    return result

def genPopulation(popSize,password):
  pop=[]
  for i in range(popSize):
    pop.append(genIndiv(password))
  return pop

def fitPerIndiv(popSize,password):
    popu={}
    for i in genPopulation(popSize,password):
      popu[i]=fitness(password,i)
    return sorted(popu.items(),key=lambda kv: kv[1])

x=fitPerIndiv(25600,'alex')
for p in x:
    print(p[0],p[1])

