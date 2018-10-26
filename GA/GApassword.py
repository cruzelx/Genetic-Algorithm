import random

def genPasswd(length):
    result=''
    for i in range(length):
            result+=chr(int(97+26*random.random()))
    return result

def genPopulation(popSize,password):
    population=[]
    for i in range(popSize):
        population.append(genPasswd(len(password)))
    return population

def fitness(password,check):
    if len(password)!=len(check):
        return("password length doesn't match...")
    else:
        score=0
        for i in range(len(password)):
            if(password[i]==check[i]):
                score+=1
    return score*100/len(password)

def fitPerIndividual(population):
    fitPerPop={}
    for person in population:
        fitPerPop[person]=fitness(password,person)
    return sorted(fitPerPop.items(),key=lambda kv: kv[1])

def matingPool(sortedPopu):
    randomParent1,randomParent2=random.choice(sortedPopu)[0],random.choice(sortedPopu)[0]
    
    
    

