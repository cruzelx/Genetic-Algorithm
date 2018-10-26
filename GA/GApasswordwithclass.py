import random,sys

class GA:
    def __init__ (self,password,PopuSize):
        self.password=password
        self.popuSize=PopuSize
        self.passwdSize=len(self.password)
        self.popu=[]
        self.sortedPopu=[]
        self.nextgen=[]
        self.loop=False
        self.terminate=False
        self.generation=0
        print('once-------------------------------------------------------------------')


    def genPasswd(self):
        result=''
        for i in range((self.passwdSize)):
            result+=chr(int(97+26*random.random()))
        return result

    def genPopu(self):
        if self.loop==False:
            for i in range(self.popuSize):
                a=self.genPasswd()
                if(a==self.password):
                    print('password --> ',a)
                self.popu.append(a)
            #print(self.popu)
        else:
            pass
            #print(self.popu)

    def fitness(self,check):
        if(self.passwdSize!=len(check)):
            return("invalid length of password...")
        else:
            score=0
            for i in range(self.passwdSize):
                if(self.password[i]==check[i]):
                    score+=1
        return score*1.0/self.passwdSize*1.0

    def fitPerIndiv(self):
        fitness=[]
        for indiv in self.popu:
            fitness.append(self.fitness(indiv))
        self.sortedPopu=sorted(zip(fitness,self.popu))
        return self.sortedPopu


    def selection(self):
        convergence=100
        randNum=int(random.random()*self.popuSize)
        if (randNum+convergence)>=self.popuSize:
            randNum=self.popuSize-convergence
        y=j=0
        for i in range(randNum,randNum+convergence):
            x=self.fitness(self.sortedPopu[i][1])
            if(x>y):
                y,j=x,i
        #print(self.sortedPopu[i])
        return self.sortedPopu[i]


    def crossover(self):
        for j in range(self.popuSize):
            parent1=list(self.selection()[1])
            parent2=list(self.selection()[1])
            for i in range(int(random.random()*self.passwdSize),self.passwdSize):
                temp=parent1[i]
                parent1[i]=parent2[i]
                parent2[i]=temp
            self.nextgen.append(''.join(parent1))


    def swapMutation(self):
        mutatedGen=[]
        for child in self.nextgen:
            p=list(child)
            p[int(random.random()*self.passwdSize)]=random.choice(list('abcdefghijklmnopqrstuvwxyz 0123456789'))
            mutatedGen.append(''.join(p))
        self.nextgen=[]
        self.popu=mutatedGen
        self.loop=True

    def termination(self):
        mostFit,mostFitIndiv=self.fitPerIndiv()[-1]
        self.generation+=1
        print('Generation: ',self.generation,' --> ',mostFitIndiv,' fitness: ',mostFit)
        if(mostFitIndiv==self.password):
            return True

x=GA('alex bhattarai 073bex402 pulchowk campus',500)

while True:
    x.genPopu()
    x.fitPerIndiv()
    x.crossover()
    x.swapMutation()
    if(x.termination()):
        break
