
var myscore = 0;
var computerscore = 0;

var win = 0
var lose = 0
var draw = 0


var userList = [1,2,3,4,5,6,7,8,9,10,11]
var computerList = [1,2,3,4,5,6,7,8,9,10,11]

var images = {1:'A.png', 2:'2.png' , 3:'3.png' , 4:'4.png' , 5:'5.png' , 6:'6.png' , 7:'7.png',
            8:'8.png', 9:'9.png', 10:'J.png',11:'Q.png',12:'K.png'}



// To play Sound

function playSound(id)
{
    var s = document.getElementById(id);
    s.play();
}

// Update Score Table         
function updateResults(win,lose,draw)
{
    document.getElementById("wins").innerText = win;
    document.getElementById("losses").innerText = lose
    document.getElementById("draws").innerText = draw
}

function updateCardImage(id,image,scoreId,score)
{
    // Play Sound
    playSound("cardput")
    // Adding Image
    var newImage = `<img class="card" src="images/${image}"/>`
    var initial =  document.getElementById(id).innerHTML;
    document.getElementById(id).innerHTML = initial + newImage

    // Updating Score 
    document.getElementById(scoreId).innerText = `You: ${score}`


}



function hit()
{

    // Base Condition
   
    // Taking a random index of array
    var randomIndex = Math.floor(  Math.random()* (userList.length)  )

    // Element at that index and increasing Score
    var cardValue = userList[randomIndex]

    // if score are not burst then only add new score
    if(! (myscore > 21))
    {
        myscore += cardValue
    }
    // if socre are burst then show burst score and return not update anything
    if(myscore > 21)
    {
        document.getElementById("userstatus").innerText = "You Burst  at " + myscore + "!"
        return;
    }

   

    // Taking card image name of spaecific elemtent
    var cardImage = images[cardValue]
    

    //Updating the card in the UI (Html) Adding images and Updating Socre
    updateCardImage("cardrow",cardImage,"userscore",myscore)


    // Removing that card from the available cards
    userList.splice(randomIndex,1)
  
}

function stand()
{
    
    // After Clicking on stand make the hit button disable
    document.getElementById("hitbtn").disabled = true
    // Make the stand button also disable
    document.getElementById("standbtn").disabled = true
    computerTurn()
   
}

// Reset Function
function deal()
{
    // Enable hit and stand button
    document.getElementById("hitbtn").disabled = false
    document.getElementById("standbtn").disabled = false

    //play sound
    playSound("cardput")

    // Reset Scores
    myscore = 0;
    computerscore = 0
    

    // Reset Card Lists
    computerList = [1,2,3,4,5,6,7,8,9,10,11]
    userList = [1,2,3,4,5,6,7,8,9,10,11]

    // Reset Display Messages
    document.getElementById("userscore").innerText = "You: 0";
    document.getElementById("computerscore").innerText = "You: 0";
    document.getElementById("title").innerText = "Let's Play!"
    document.getElementById("userstatus").innerText = "";
    document.getElementById("computerstatus").innerText = "";

    // Reset Images
    document.getElementById("cardrow").innerHTML = "";
    document.getElementById("usercardrow").innerHTML = "";
}

async function computerTurn()
{
    // Computer cannot stop before 17

  
    while(computerscore<17)
    {
        var randomIndex = Math.floor(  Math.random()* (computerList.length)  )
        var cardValue = computerList[randomIndex]
        
        computerscore+=cardValue
        var cardImage = images[cardValue]
        
        updateCardImage("usercardrow",cardImage,"computerscore",computerscore)


        computerList.splice(randomIndex,1)
        
        await new Promise(r => setTimeout(r, 1000));

    }
 
        
    
   
    if( computerscore > 21)
    {
        document.getElementById("computerstatus").innerText = "You Burst  at " + computerscore + "!"
    }

    calculateResult()
   
}

function calculateResult()
{
    
    if(  (computerscore > 21 && myscore > 21) ||  (computerscore === myscore))
    {
        document.getElementById("title").innerText = "Draw"
        draw += 1


    }

    else if ( myscore > 21 && computerscore <=21)
    {
        document.getElementById("title").innerText = "Oh....You Loose !"
        lose+=1
        playSound("loose")
    }
    else if ( myscore <=21 && computerscore > 21)
    {
        document.getElementById("title").innerText = "You Won! Huraaaah...."
        win+=1
        playSound("win")
    }

    else if ( computerscore > myscore )
    {
        document.getElementById("title").innerText = "Oh....You Loose !"
        lose+=1
        playSound("loose")
    }
    else
    {
        document.getElementById("title").innerText = "You Won! Huraaaah...."
        win+=1
        playSound("win")
    }

    updateResults(win,lose,draw)
}