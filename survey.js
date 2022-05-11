const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(100)
}

function restartGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return restartGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        //Survey prompt
        id: 100,
        text: 'Want some tips on how to prepare for online schooling? Click here!',
        options: [
            {
                text: 'Start survey',
                nextText: 1
            }
        ]
    },
    {
        //Student or teacher question
        id: 1,
        text: 'What level of education are you currently at?',
        options: [
            {
                text: 'Middle School',
                setState: { student: true },
                nextText: 2
            },
            {
                text: 'High School',
                setState: { student: true },
                nextText: 2
            },
            {
                text: 'College / University',
                setState: { student: true },
                nextText: 2
            },
            {
                text: 'Teacher / Professor',
                setState: { teacher: true },
                nextText: 12
            }
        ]
    },
    //Student questions BEGIN: Question 2 Neutral
    {
        id: 2,
        text: 'What have you used computers for the most previously?',
        options: [
            {
                text: 'Entertainment (Movies, Games, Social Media)',
                nextText: 3
            },
            {
                text: 'Work',
                nextText: 3
            },
            {
                text: 'School',
                nextText: 3
            },
            {
                text: 'Not used much previously',
                nextText: 3
            }
        ]
    },
    //Student Question 3 Branch
    {
        id: 3,
        text: 'Do you have a computer with internet access at home?',
        options: [
            {
                //Prepared
                text: 'Yes',
                setState: { computer: true },
                nextText: 4
            },
            {
                //Not prepared
                text: 'No',
                setState: { computer: false },
                nextText: 51
            }
        ]
    },
    //Student Question 3a If prepared
    {
        id: 4,
        text: 'Do you have a webcam and microphone?',
        options: [
            {
                text: 'Yes',
                setState: { videocall: true },
                nextText: 5
            },
            {
                text: 'No',
                setState: { videocall: false },
                nextText: 5
            }
        ]
    },
    //Student Question 5 Branch
    //Q3: Prepared Q4:  Q5:  Q6:  Q7:  
    {
        id: 5,
        text: 'Do you have knowledge of computer software like Zoom, Google Drive, and Microsoft Word, and how to use them?',
        options: [
            //Prepared
            {
                text: 'Yes, I have used all the mentioned software before',
                nextText: 6
            },
            //Prepared
            {
                text: 'Yes, I know and have used some',
                nextText: 6
            },
            //Not prepared
            {
                text: 'No previous experience',
                nextText: 61
            }
        ]
    },
    //Q3: Not Prepared Q4:  Q5:  Q6:  Q7:  
    {
        id: 51,
        text: 'Do you have knowledge of computer software like Zoom, Google Drive, and Microsoft Word, and how to use them?',
        options: [
            //Prepared
            {
                text: 'Yes, I have used all the mentioned software before',
                nextText: 62
            },
            //Prepared
            {
                text: 'Yes, I know and have used some',
                nextText: 62
            },
            //Not prepared
            {
                text: 'No previous experience',
                nextText: 63
            }
        ]
    },
    //Student Question 6 Branch
    //Q3: Prepared Q4: Prepared Q5:  Q6:  Q7:  
    {
        id: 6,
        text: 'Do you have a high level of self discipline when it comes to school work?',
        options: [
            //Prepared
            {
                text: 'Yes, I set aside time to study and do homework.',
                nextText: 7
            },
            //Prepared
            {
                text: 'Yes, but I need guidance/reminders for assignments/tests',
                nextText: 7
            },
            //Not prepared
            {
                text: 'No, I procrastinate easily at home',
                nextText: 71
            }
        ]
    },
    //Q3: Prepared  Q4: Not Prepared Q5:  Q6:  Q7:  
    {
        id: 61,
        text: 'Do you have a high level of self discipline when it comes to school work?',
        options: [
            //Prepared
            {
                text: 'Yes, I set aside time to study and do homework.',
                nextText: 72
            },
            //Prepared
            {
                text: 'Yes, but I need guidance/reminders for assignments/tests',
                nextText: 72
            },
            //Not Prepared
            {
                text: 'No, I procrastinate easily at home',
                nextText: 73
            }
        ]
    },
    //Q3: Not Prepared Q4: Prepared Q5:  Q6:  Q7:  
    {
        id: 62,
        text: 'Do you have a high level of self discipline when it comes to school work?',
        options: [
            {
                text: 'Yes, I set aside time to study and do homework.',
                nextText: 74
            },
            {
                text: 'Yes, but I need guidance/reminders for assignments/tests',
                nextText: 74
            },
            {
                text: 'No, I procrastinate easily at home',
                nextText: 75
            }
        ]
    },
    //Q3: Not Prepared Q4: Not Prepared Q5:  Q6:  Q7:  
    {
        id: 63,
        text: 'Do you have a high level of self discipline when it comes to school work?',
        options: [
            {
                text: 'Yes, I set aside time to study and do homework.',
                nextText: 76
            },
            {
                text: 'Yes, but I need guidance/reminders for assignments/tests',
                nextText: 76
            },
            {
                text: 'No, I procrastinate easily at home',
                nextText: 77
            }
        ]
    },
    //Student Question 7
    //Q3: Prepared Q4: Prepared Q5: Prepared Q6:  Q7:  
    {
        id: 7,
        text: 'How do you learn best?',
        options: [
            //Prepared
            {
                text: 'Taking notes during a lecture',
                nextText: 8
            },
            //Prepared
            {
                text: 'Watching examples',
                nextText: 8
            },
            //Not prepared/Not well suited
            {
                text: 'Doing hands-on activities',
                nextText: 81
            },
            //Prepared
            {
                text: 'Reading a textbook',
                nextText: 8
            }
        ]
    },
    //Q3: Prepared Q4: Prepared Q5: Not Prepared Q6:  Q7:  
    {
        id: 71,
        text: 'How do you learn best?',
        options: [
            //Prepared
            {
                text: 'Taking notes during a lecture',
                nextText: 82
            },
            //Prepared
            {
                text: 'Watching examples',
                nextText: 82
            },
            //Not prepared/Not well suited
            {
                text: 'Doing hands-on activities',
                nextText: 83
            },
            //Prepared
            {
                text: 'Reading a textbook',
                nextText: 82
            }
        ]
    },
    //Q3: Prepared Q4: Not Prepared Q5: Prepared Q6:  Q7:  
    {
        id: 72,
        text: 'How do you learn best?',
        options: [
            //Prepared
            {
                text: 'Taking notes during a lecture',
                nextText: 84
            },
            //Prepared
            {
                text: 'Watching examples',
                nextText: 84
            },
            //Not prepared/Not well suited
            {
                text: 'Doing hands-on activities',
                nextText: 85
            },
            //Prepared
            {
                text: 'Reading a textbook',
                nextText: 84
            }
        ]
    },
    //Q3: Prepared Q4: Not Prepared Q5: Not Prepared Q6:  Q7:  
    {
        id: 73,
        text: 'How do you learn best?',
        options: [
            //Prepared
            {
                text: 'Taking notes during a lecture',
                nextText: 86
            },
            //Prepared
            {
                text: 'Watching examples',
                nextText: 86
            },
            //Not prepared/Not well suited
            {
                text: 'Doing hands-on activities',
                nextText: 87
            },
            //Prepared
            {
                text: 'Reading a textbook',
                nextText: 86
            }
        ]
    },
    //Q3: Not Prepared Q4: Prepared Q5: Prepared Q6:  Q7:  
    {
        id: 74,
        text: 'How do you learn best?',
        options: [
            //Prepared
            {
                text: 'Taking notes during a lecture',
                nextText: 88
            },
            //Prepared
            {
                text: 'Watching examples',
                nextText: 88
            },
            //Not prepared/Not well suited
            {
                text: 'Doing hands-on activities',
                nextText: 89
            },
            //Prepared
            {
                text: 'Reading a textbook',
                nextText: 88
            }
        ]
    },
    //Q3: Not Prepared Q4: Prepared Q5: Not Prepared Q6:  Q7:  
    {
        id: 75,
        text: 'How do you learn best?',
        options: [
            //Prepared
            {
                text: 'Taking notes during a lecture',
                nextText: 810
            },
            //Prepared
            {
                text: 'Watching examples',
                nextText: 810
            },
            //Not prepared/Not well suited
            {
                text: 'Doing hands-on activities',
                nextText: 811
            },
            //Prepared
            {
                text: 'Reading a textbook',
                nextText: 810
            }
        ]
    },
    //Q3: Not Prepared Q4: Not Prepared Q5: Prepared Q6:  Q7:  
    {
        id: 76,
        text: 'How do you learn best?',
        options: [
            //Prepared
            {
                text: 'Taking notes during a lecture',
                nextText: 812
            },
            //Prepared
            {
                text: 'Watching examples',
                nextText: 812
            },
            //Not prepared/Not well suited
            {
                text: 'Doing hands-on activities',
                nextText: 813
            },
            //Prepared
            {
                text: 'Reading a textbook',
                nextText: 812
            }
        ]
    },
    //Q3: Not Prepared Q4: Not Prepared Q5: Not Prepared Q6:  Q7:  
    {
        id: 77,
        text: 'How do you learn best?',
        options: [
            //Prepared
            {
                text: 'Taking notes during a lecture',
                nextText: 814
            },
            //Prepared
            {
                text: 'Watching examples',
                nextText: 814
            },
            //Not prepared/Not well suited
            {
                text: 'Doing hands-on activities',
                nextText: 815
            },
            //Prepared
            {
                text: 'Reading a textbook',
                nextText: 814
            }
        ]
    },
    //Student Question 8 Branch
    //Q3: Prepared Q4: Prepared Q5: Prepared Q6: Prepared Q7:  
    {
        id: 8,
        text: 'Are you comfortable with allocating time outside of class to talk to a teacher?',
        options: [
            //Prepared
            {
                text: 'Yes',
                nextText: 9
            },
            //Not prepared
            {
                text: 'No',
                nextText: 91
            }
        ]
    },
    //Q3: Prepared Q4: Prepared Q5: Prepared Q6: Not Prepared Q7:  
    {
        id: 81,
        text: 'Are you comfortable with allocating time outside of class to talk to a teacher?',
        options: [
            //Prepared
            {
                text: 'Yes',
                nextText: 92
            },
            //Not prepared
            {
                text: 'No',
                nextText: 93
            }
        ]
    },
    //Q3: Prepared Q4: Prepared Q5: Not Prepared Q6: Prepared Q7:  
    {
        id: 82,
        text: 'Are you comfortable with allocating time outside of class to talk to a teacher?',
        options: [
            //Prepared
            {
                text: 'Yes',
                nextText: 94
            },
            //Not prepared
            {
                text: 'No',
                nextText: 95
            }
        ]
    },
    //Q3: Prepared Q4: Prepared Q5: Not Prepared Q6: Not Prepared Q7:  
    {
        id: 83,
        text: 'Are you comfortable with allocating time outside of class to talk to a teacher?',
        options: [
            //Prepared
            {
                text: 'Yes',
                nextText: 96
            },
            //Not prepared
            {
                text: 'No',
                nextText: 97
            }
        ]
    },
    //Q3: Prepared Q4: Not Prepared Q5: Prepared Q6: Prepared Q7:  
    {
        id: 84,
        text: 'Are you comfortable with allocating time outside of class to talk to a teacher?',
        options: [
            //Prepared
            {
                text: 'Yes',
                nextText: 98
            },
            //Not prepared
            {
                text: 'No',
                nextText: 99
            }
        ]
    },
    //Q3: Prepared Q4: Not Prepared Q5: Prepared Q6: Not Prepared Q7:  
    {
        id: 85,
        text: 'Are you comfortable with allocating time outside of class to talk to a teacher?',
        options: [
            //Prepared
            {
                text: 'Yes',
                nextText: 910
            },
            //Not prepared
            {
                text: 'No',
                nextText: 911
            }
        ]
    },
    //Q3: Prepared Q4: Not Prepared Q5: Not Prepared Q6: Prepared Q7:  
    {
        id: 86,
        text: 'Are you comfortable with allocating time outside of class to talk to a teacher?',
        options: [
            //Prepared
            {
                text: 'Yes',
                nextText: 912
            },
            //Not prepared
            {
                text: 'No',
                nextText: 913
            }
        ]
    },
    //Q3: Prepared Q4: Not Prepared Q5: Not Prepared Q6: Not Prepared Q7:  
    {
        id: 87,
        text: 'Are you comfortable with allocating time outside of class to talk to a teacher?',
        options: [
            //Prepared
            {
                text: 'Yes',
                nextText: 914
            },
            //Not prepared
            {
                text: 'No',
                nextText: 915
            }
        ]
    },
    //Q3: Not Prepared Q4: Prepared Q5: Prepared Q6: Prepared Q7:  
    {
        id: 88,
        text: 'Are you comfortable with allocating time outside of class to talk to a teacher?',
        options: [
            //Prepared
            {
                text: 'Yes',
                nextText: 916
            },
            //Not prepared
            {
                text: 'No',
                nextText: 917
            }
        ]
    },
    //Q3: Not Prepared Q4: Prepared Q5: Prepared Q6: Not Prepared Q7:  
    {
        id: 89,
        text: 'Are you comfortable with allocating time outside of class to talk to a teacher?',
        options: [
            //Prepared
            {
                text: 'Yes',
                nextText: 918
            },
            //Not prepared
            {
                text: 'No',
                nextText: 919
            }
        ]
    },
    //Q3: Not Prepared Q4: Prepared Q5: Not Prepared Q6: Prepared Q7:  
    {
        id: 810,
        text: 'Are you comfortable with allocating time outside of class to talk to a teacher?',
        options: [
            //Prepared
            {
                text: 'Yes',
                nextText: 920
            },
            //Not prepared
            {
                text: 'No',
                nextText: 921
            }
        ]
    },
    //Q3: Not Prepared Q4: Prepared Q5: Not Prepared Q6: Not Prepared Q7:  
    {
        id: 811,
        text: 'Are you comfortable with allocating time outside of class to talk to a teacher?',
        options: [
            //Prepared
            {
                text: 'Yes',
                nextText: 922
            },
            //Not prepared
            {
                text: 'No',
                nextText: 923
            }
        ]
    },
    //Q3: Not Prepared Q4: Not Prepared Q5: Prepared Q6: Prepared Q7:  
    {
        id: 812,
        text: 'Are you comfortable with allocating time outside of class to talk to a teacher?',
        options: [
            //Prepared
            {
                text: 'Yes',
                nextText: 924
            },
            //Not prepared
            {
                text: 'No',
                nextText: 925
            }
        ]
    },
    //Q3: Not Prepared Q4: Not Prepared Q5: Prepared Q6: Not Prepared Q7:  
    {
        id: 813,
        text: 'Are you comfortable with allocating time outside of class to talk to a teacher?',
        options: [
            //Prepared
            {
                text: 'Yes',
                nextText: 926
            },
            //Not prepared
            {
                text: 'No',
                nextText: 927
            }
        ]
    },
    //Q3: Not Prepared Q4: Not Prepared Q5: Not Prepared Q6: Prepared Q7:  
    {
        id: 814,
        text: 'Are you comfortable with allocating time outside of class to talk to a teacher?',
        options: [
            //Prepared
            {
                text: 'Yes',
                nextText: 928
            },
            //Not prepared
            {
                text: 'No',
                nextText: 929
            }
        ]
    },
    //Q3: Not Prepared Q4: Not Prepared Q5: Not Prepared Q6: Not Prepared Q7:  
    {
        id: 815,
        text: 'Are you comfortable with allocating time outside of class to talk to a teacher?',
        options: [
            //Prepared
            {
                text: 'Yes',
                nextText: 930
            },
            //Not prepared
            {
                text: 'No',
                nextText: 931
            }
        ]
    },
    //Student Question 9 General
    //Q3: Prepared Q4: Prepared Q5: Prepared Q6: Prepared Q7: Prepared 
    {
        id: 9,
        text: 'How would shifting to online classes make you feel about your education?',
        options: [
            {
                text: 'It makes me feel better about my education',
                nextText: 10
            },
            {
                text: 'It makes me feel worse about my education',
                nextText: 10
            },
            {
                text: 'My feelings are unchanged',
                nextText: 10
            }
        ]
    },
    //Q3: Prepared Q4: Prepared Q5: Prepared Q6: Prepared Q7: Not Prepared 
    {
        id: 91,
        text: 'How would shifting to online classes make you feel about your education?',
        options: [
            {
                text: 'It makes me feel better about my education',
                nextText: 101
            },
            {
                text: 'It makes me feel worse about my education',
                nextText: 101
            },
            {
                text: 'My feelings are unchanged',
                nextText: 101
            }
        ]
    },
    //Q3: Prepared Q4: Prepared Q5: Prepared Q6: Not Prepared Q7: Prepared 
    {
        id: 92,
        text: 'How would shifting to online classes make you feel about your education?',
        options: [
            {
                text: 'It makes me feel better about my education',
                nextText: 102
            },
            {
                text: 'It makes me feel worse about my education',
                nextText: 102
            },
            {
                text: 'My feelings are unchanged',
                nextText: 102
            }
        ]
    },
    //Q3: Prepared Q4: Prepared Q5: Prepared Q6: Not Prepared Q7: Not Prepared 
    {
        id: 93,
        text: 'How would shifting to online classes make you feel about your education?',
        options: [
            {
                text: 'It makes me feel better about my education',
                nextText: 103
            },
            {
                text: 'It makes me feel worse about my education',
                nextText: 103
            },
            {
                text: 'My feelings are unchanged',
                nextText: 103
            }
        ]
    },
    //Q3: Prepared Q4: Prepared Q5: Not Prepared Q6: Prepared Q7: Prepared 
    {
        id: 94,
        text: 'How would shifting to online classes make you feel about your education?',
        options: [
            {
                text: 'It makes me feel better about my education',
                nextText: 104
            },
            {
                text: 'It makes me feel worse about my education',
                nextText: 104
            },
            {
                text: 'My feelings are unchanged',
                nextText: 104
            }
        ]
    },
    //Q3: Prepared Q4: Prepared Q5: Not Prepared Q6: Prepared Q7: Not Prepared 
    {
        id: 95,
        text: 'How would shifting to online classes make you feel about your education?',
        options: [
            {
                text: 'It makes me feel better about my education',
                nextText: 105
            },
            {
                text: 'It makes me feel worse about my education',
                nextText: 105
            },
            {
                text: 'My feelings are unchanged',
                nextText: 105
            }
        ]
    },
    //Q3: Prepared Q4: Prepared Q5: Not Prepared Q6: Not Prepared Q7: Prepared 
    {
        id: 96,
        text: 'How would shifting to online classes make you feel about your education?',
        options: [
            {
                text: 'It makes me feel better about my education',
                nextText: 106
            },
            {
                text: 'It makes me feel worse about my education',
                nextText: 106
            },
            {
                text: 'My feelings are unchanged',
                nextText: 106
            }
        ]
    },
    //Q3: Prepared Q4: Prepared Q5: Not Prepared Q6: Not Prepared Q7: Not Prepared 
    {
        id: 97,
        text: 'How would shifting to online classes make you feel about your education?',
        options: [
            {
                text: 'It makes me feel better about my education',
                nextText: 107
            },
            {
                text: 'It makes me feel worse about my education',
                nextText: 107
            },
            {
                text: 'My feelings are unchanged',
                nextText: 107
            }
        ]
    },
    //Q3: Prepared Q4: Not Prepared Q5: Prepared Q6: Prepared Q7: Prepared 
    {
        id: 98,
        text: 'How would shifting to online classes make you feel about your education?',
        options: [
            {
                text: 'It makes me feel better about my education',
                nextText: 108
            },
            {
                text: 'It makes me feel worse about my education',
                nextText: 108
            },
            {
                text: 'My feelings are unchanged',
                nextText: 108
            }
        ]
    },
    //Q3: Prepared Q4: Not Prepared Q5: Prepared Q6: Prepared Q7: Not Prepared 
    {
        id: 99,
        text: 'How would shifting to online classes make you feel about your education?',
        options: [
            {
                text: 'It makes me feel better about my education',
                nextText: 109
            },
            {
                text: 'It makes me feel worse about my education',
                nextText: 109
            },
            {
                text: 'My feelings are unchanged',
                nextText: 109
            }
        ]
    },
    //Q3: Prepared Q4: Not Prepared Q5: Prepared Q6: Not Prepared Q7: Prepared 
    {
        id: 910,
        text: 'How would shifting to online classes make you feel about your education?',
        options: [
            {
                text: 'It makes me feel better about my education',
                nextText: 1010
            },
            {
                text: 'It makes me feel worse about my education',
                nextText: 1010
            },
            {
                text: 'My feelings are unchanged',
                nextText: 1010
            }
        ]
    },
    //Q3: Prepared Q4: Not Prepared Q5: Prepared Q6: Not Prepared Q7: Not Prepared 
    {
        id: 911,
        text: 'How would shifting to online classes make you feel about your education?',
        options: [
            {
                text: 'It makes me feel better about my education',
                nextText: 1011
            },
            {
                text: 'It makes me feel worse about my education',
                nextText: 1011
            },
            {
                text: 'My feelings are unchanged',
                nextText: 1011
            }
        ]
    },
    //Q3: Prepared Q4: Not Prepared Q5: Not Prepared Q6: Prepared Q7: Prepared 
    {
        id: 912,
        text: 'How would shifting to online classes make you feel about your education?',
        options: [
            {
                text: 'It makes me feel better about my education',
                nextText: 1012
            },
            {
                text: 'It makes me feel worse about my education',
                nextText: 1012
            },
            {
                text: 'My feelings are unchanged',
                nextText: 1012
            }
        ]
    },
    //Q3: Prepared Q4: Not Prepared Q5: Not Prepared Q6: Prepared Q7: Not Prepared 
    {
        id: 913,
        text: 'How would shifting to online classes make you feel about your education?',
        options: [
            {
                text: 'It makes me feel better about my education',
                nextText: 1013
            },
            {
                text: 'It makes me feel worse about my education',
                nextText: 1013
            },
            {
                text: 'My feelings are unchanged',
                nextText: 1013
            }
        ]
    },
    //Q3: Prepared Q4: Not Prepared Q5: Not Prepared Q6: Not Prepared Q7: Prepared 
    {
        id: 914,
        text: 'How would shifting to online classes make you feel about your education?',
        options: [
            {
                text: 'It makes me feel better about my education',
                nextText: 1014
            },
            {
                text: 'It makes me feel worse about my education',
                nextText: 1014
            },
            {
                text: 'My feelings are unchanged',
                nextText: 1014
            }
        ]
    },
    //Q3: Prepared Q4: Not Prepared Q5: Not Prepared Q6: Not Prepared Q7: Not Prepared 
    {
        id: 915,
        text: 'How would shifting to online classes make you feel about your education?',
        options: [
            {
                text: 'It makes me feel better about my education',
                nextText: 1015
            },
            {
                text: 'It makes me feel worse about my education',
                nextText: 1015
            },
            {
                text: 'My feelings are unchanged',
                nextText: 1015
            }
        ]
    },
    //Q3: Not Prepared Q4: Prepared Q5: Prepared Q6: Prepared Q7: Prepared 
    {
        id: 916,
        text: 'How would shifting to online classes make you feel about your education?',
        options: [
            {
                text: 'It makes me feel better about my education',
                nextText: 1016
            },
            {
                text: 'It makes me feel worse about my education',
                nextText: 1016
            },
            {
                text: 'My feelings are unchanged',
                nextText: 1016
            }
        ]
    },
    //Q3: Not Prepared Q4: Prepared Q5: Prepared Q6: Prepared Q7: Not Prepared 
    {
        id: 917,
        text: 'How would shifting to online classes make you feel about your education?',
        options: [
            {
                text: 'It makes me feel better about my education',
                nextText: 1017
            },
            {
                text: 'It makes me feel worse about my education',
                nextText: 1017
            },
            {
                text: 'My feelings are unchanged',
                nextText: 1017
            }
        ]
    },
    //Q3: Not Prepared Q4: Prepared Q5: Prepared Q6: Not Prepared Q7: Prepared 
    {
        id: 918,
        text: 'How would shifting to online classes make you feel about your education?',
        options: [
            {
                text: 'It makes me feel better about my education',
                nextText: 1018
            },
            {
                text: 'It makes me feel worse about my education',
                nextText: 1018
            },
            {
                text: 'My feelings are unchanged',
                nextText: 1018
            }
        ]
    },
    //Q3: Not Prepared Q4: Prepared Q5: Prepared Q6: Not Prepared Q7: Not Prepared 
    {
        id: 919,
        text: 'How would shifting to online classes make you feel about your education?',
        options: [
            {
                text: 'It makes me feel better about my education',
                nextText: 1019
            },
            {
                text: 'It makes me feel worse about my education',
                nextText: 1019
            },
            {
                text: 'My feelings are unchanged',
                nextText: 1019
            }
        ]
    },
    //Q3: Not Prepared Q4: Prepared Q5: Not Prepared Q6: Not Prepared Q7: Prepared 
    {
        id: 920,
        text: 'How would shifting to online classes make you feel about your education?',
        options: [
            {
                text: 'It makes me feel better about my education',
                nextText: 1020
            },
            {
                text: 'It makes me feel worse about my education',
                nextText: 1020
            },
            {
                text: 'My feelings are unchanged',
                nextText: 1020
            }
        ]
    },
    //Q3: Not Prepared Q4: Prepared Q5: Not Prepared Q6: Not Prepared Q7: Not Prepared 
    {
        id: 921,
        text: 'How would shifting to online classes make you feel about your education?',
        options: [
            {
                text: 'It makes me feel better about my education',
                nextText: 1021
            },
            {
                text: 'It makes me feel worse about my education',
                nextText: 1021
            },
            {
                text: 'My feelings are unchanged',
                nextText: 1021
            }
        ]
    },
    //Q3: Not Prepared Q4: Prepared Q5: Not Prepared Q6: Not Prepared Q7: Prepared 
    {
        id: 922,
        text: 'How would shifting to online classes make you feel about your education?',
        options: [
            {
                text: 'It makes me feel better about my education',
                nextText: 1022
            },
            {
                text: 'It makes me feel worse about my education',
                nextText: 1022
            },
            {
                text: 'My feelings are unchanged',
                nextText: 1022
            }
        ]
    },
    //Q3: Not Prepared Q4: Prepared Q5: Not Prepared Q6: Not Prepared Q7: Not Prepared 
    {
        id: 923,
        text: 'How would shifting to online classes make you feel about your education?',
        options: [
            {
                text: 'It makes me feel better about my education',
                nextText: 1023
            },
            {
                text: 'It makes me feel worse about my education',
                nextText: 1023
            },
            {
                text: 'My feelings are unchanged',
                nextText: 1023
            }
        ]
    },
    //Q3: Not Prepared Q4: Not Prepared Q5: Prepared Q6: Prepared Q7: Prepared 
    {
        id: 924,
        text: 'How would shifting to online classes make you feel about your education?',
        options: [
            {
                text: 'It makes me feel better about my education',
                nextText: 1024
            },
            {
                text: 'It makes me feel worse about my education',
                nextText: 1024
            },
            {
                text: 'My feelings are unchanged',
                nextText: 1024
            }
        ]
    },
    //Q3: Not Prepared Q4: Not Prepared Q5: Prepared Q6: Prepared Q7: Not Prepared 
    {
        id: 925,
        text: 'How would shifting to online classes make you feel about your education?',
        options: [
            {
                text: 'It makes me feel better about my education',
                nextText: 1025
            },
            {
                text: 'It makes me feel worse about my education',
                nextText: 1025
            },
            {
                text: 'My feelings are unchanged',
                nextText: 1025
            }
        ]
    },
    //Q3: Not Prepared Q4: Not Prepared Q5: Prepared Q6: Not Prepared Q7: Prepared 
    {
        id: 926,
        text: 'How would shifting to online classes make you feel about your education?',
        options: [
            {
                text: 'It makes me feel better about my education',
                nextText: 1026
            },
            {
                text: 'It makes me feel worse about my education',
                nextText: 1026
            },
            {
                text: 'My feelings are unchanged',
                nextText: 1026
            }
        ]
    },
    //Q3: Not Prepared Q4: Not Prepared Q5: Prepared Q6: Not Prepared Q7: Not Prepared 
    {
        id: 927,
        text: 'How would shifting to online classes make you feel about your education?',
        options: [
            {
                text: 'It makes me feel better about my education',
                nextText: 1027
            },
            {
                text: 'It makes me feel worse about my education',
                nextText: 1027
            },
            {
                text: 'My feelings are unchanged',
                nextText: 1027
            }
        ]
    },
    //Q3: Not Prepared Q4: Not Prepared Q5: Not Prepared Q6: Prepared Q7: Prepared 
    {
        id: 928,
        text: 'How would shifting to online classes make you feel about your education?',
        options: [
            {
                text: 'It makes me feel better about my education',
                nextText: 1028
            },
            {
                text: 'It makes me feel worse about my education',
                nextText: 1028
            },
            {
                text: 'My feelings are unchanged',
                nextText: 1028
            }
        ]
    },
    //Q3: Not Prepared Q4: Not Prepared Q5: Not Prepared Q6: Prepared Q7: Not Prepared 
    {
        id: 929,
        text: 'How would shifting to online classes make you feel about your education?',
        options: [
            {
                text: 'It makes me feel better about my education',
                nextText: 1029
            },
            {
                text: 'It makes me feel worse about my education',
                nextText: 1029
            },
            {
                text: 'My feelings are unchanged',
                nextText: 1029
            }
        ]
    },
    //Q3: Not Prepared Q4: Not Prepared Q5: Not Prepared Q6: Not Prepared Q7: Prepared 
    {
        id: 930,
        text: 'How would shifting to online classes make you feel about your education?',
        options: [
            {
                text: 'It makes me feel better about my education',
                nextText: 1030
            },
            {
                text: 'It makes me feel worse about my education',
                nextText: 1030
            },
            {
                text: 'My feelings are unchanged',
                nextText: 1030
            }
        ]
    },
    //Q3: Not Prepared Q4: Not Prepared Q5: Not Prepared Q6: Not Prepared Q7: Not Prepared 
    {
        id: 931,
        text: 'How would shifting to online classes make you feel about your education?',
        options: [
            {
                text: 'It makes me feel better about my education',
                nextText: 1031
            },
            {
                text: 'It makes me feel worse about my education',
                nextText: 1031
            },
            {
                text: 'My feelings are unchanged',
                nextText: 1031
            }
        ]
    },
    //Final Student Report
    //Q3: Prepared Q4: Prepared Q5: Prepared Q6: Prepared Q7: Prepared 
    {
        id: 10,
        text: 'Survey complete! You are about as prepared for online learning as you could possibly be! Make sure to check your school email frequently, and use a planner to help keep track of assignments and meetings! Click the tab that matches the type of school you will be attending at the top of the website for more advice!',
        options: [
            {
                text: 'Take survey again',
                nextText: -1
            }
        ]
    },
    //Q3: Prepared Q4: Prepared Q5: Prepared Q6: Prepared Q7: Not Prepared 
    {
        id: 101,
        text: 'Survey complete! You are very prepared for online learning! If you are worried about finding time to talk to teachers, there are many options! Many teachers will talk to you through email, or stay around for a bit after a Zoom meeting to answer questions. If you are struggling with a topic, consider finding supplementary videos online. Click the tab that matches the type of school you will be attending at the top of the website for more advice!',
        options: [
            {
                text: 'Take survey again',
                nextText: -1
            }
        ]
    },
    //Q3: Prepared Q4: Prepared Q5: Prepared Q6: Not Prepared Q7: Prepared 
    {
        id: 102,
        text: 'Survey complete! You are very prepared for online learning! If you are worried about a lack of hands-on examples, that is okay! Many classes offer hybrid options, which meet partially in person, and online. These classes allow students to do hands-on examples and projects while following social distancing guidelines, and having the flexibility of asynchronous learning! Click the tab that matches the type of school you will be attending at the top of the website for more advice!',
        options: [
            {
                text: 'Take survey again',
                nextText: -1
            }
        ]
    },
    //Q3: Prepared Q4: Prepared Q5: Prepared Q6: Not Prepared Q7: Not Prepared 
    {
        id: 103,
        text: 'Survey complete! You are pretty prepared for online learning! If you are worried about talking to teachers outside of class, that is okay! Teachers will take time to answer your questions after Zoom meeting, or through an email conversation. Hybrid classes are also offered to allow time for hands-on learning. Click the tab that matches the type of school you will be attending at the top of the website for more advice!',
        options: [
            {
                text: 'Take survey again',
                nextText: -1
            }
        ]
    },
    //Q3: Prepared Q4: Prepared Q5: Not Prepared Q6: Prepared Q7: Prepared 
    {
        id: 104,
        text: 'Survey complete! You are very prepared for online learning! If you are afraid you will procrastinate during work in an online class, there are ways to help! Try setting aside time each day to do some work. Take time to get ready, and work somewhere with few distractions. This can help to simulate a school setting, and can help your productivity. Click the tab that matches the type of school you will be attending at the top of the website for more advice!',
        options: [
            {
                text: 'Take survey again',
                nextText: -1
            }
        ]
    },
    //Q3: Prepared Q4: Prepared Q5: Not Prepared Q6: Prepared Q7: Not Prepared 
    {
        id: 105,
        text: 'Survey complete! You are pretty prepared for online learning! If you are afraid you will procrastinate during work in an online class, there are ways to help! Try setting aside time each day to do some work. Take time to get ready, and work somewhere with few distractions. This can help to simulate a school setting, and can help your productivity. If you are worried about talking to teachers outside of class, rest assured that they will take time to talk to you after Zoom meetings, as well as answer questions through email. Click the tab that matches the type of school you will be attending at the top of the website for more advice!',
        options: [
            {
                text: 'Take survey again',
                nextText: -1
            }
        ]
    },
    //Q3: Prepared Q4: Prepared Q5: Not Prepared Q6: Not Prepared Q7: Prepared 
    {
        id: 106,
        text: 'Survey complete! You are pretty prepared for online learning! If you are afraid you will procrastinate during work in an online class, there are ways to help! Try setting aside time each day to do some work. Take time to get ready, and work somewhere with few distractions. This can help to simulate a school setting, and can help your productivity. If you are worried about a lack of hands-on examples, that is okay! Many classes offer hybrid options, which meet partially in person, and online. Click the tab that matches the type of school you will be attending at the top of the website for more advice!',
        options: [
            {
                text: 'Take survey again',
                nextText: -1
            }
        ]
    },
    //Q3: Prepared Q4: Prepared Q5: Not Prepared Q6: Not Prepared Q7: Not Prepared 
    {
        id: 107,
        text: 'Survey complete! You are kind of prepared for online learning. If you are afraid you will procrastinate during work in an online class, there are ways to help! Try setting aside time each day to do some work. Take time to get ready, and work somewhere with few distractions. This can help to simulate a school setting, and can help your productivity. If you are worried about a lack of hands-on examples, that is okay! Many classes offer hybrid options, which meet partially in person, and online. If you are worried about finding time to talk to teachers, there are many options! Many teachers will talk to you through email, or stay around for a bit after a Zoom meeting to answer questions. Click the tab that matches the type of school you will be attending at the top of the website for more advice!',
        options: [
            {
                text: 'Take survey again',
                nextText: -1
            }
        ]
    },
    //Q3: Prepared Q4: Not Prepared Q5: Prepared Q6: Prepared Q7: Prepared 
    {
        id: 108,
        text: 'Survey complete! You are very prepared for online learning! If you are unfamiliar with the software that will be used, that is okay! These programs have quickly become a lot more user friendly, and your school’s IT professionals or computer teacher should be able to answer any questions you have.  ',
        options: [
            {
                text: 'Take survey again',
                nextText: -1
            }
        ]
    },
    //Q3: Prepared Q4: Not Prepared Q5: Prepared Q6: Prepared Q7: Not Prepared 
    {
        id: 109,
        text: 'Survey complete! You are pretty prepared for online learning! If you are unfamiliar with the software that will be used, that is okay! These programs have quickly become a lot more user friendly, and your school’s IT professionals or computer teacher should be able to answer any questions you have. If you are worried about finding time to talk to teachers, there are many options! Many teachers will talk to you through email, or stay around for a bit after a Zoom meeting to answer questions. Click the tab that matches the type of school you will be attending at the top of the website for more advice!',
        options: [
            {
                text: 'Take survey again',
                nextText: -1
            }
        ]
    },
    //Q3: Prepared Q4: Not Prepared Q5: Prepared Q6: Not Prepared Q7: Prepared 
    {
        id: 1010,
        text: 'Survey complete! You are pretty prepared for online learning! If you are unfamiliar with the software that will be used, that is okay! These programs have quickly become a lot more user friendly, and your school’s IT professionals or computer teacher should be able to answer any questions you have. If you are worried about a lack of hands-on examples, that is okay! Many classes offer hybrid options, which meet partially in person, and online. Click the tab that matches the type of school you will be attending at the top of the website for more advice!',
        options: [
            {
                text: 'Take survey again',
                nextText: -1
            }
        ]
    },
    //Q3: Prepared Q4: Not Prepared Q5: Prepared Q6: Not Prepared Q7: Not Prepared 
    {
        id: 1011,
        text: 'Survey complete! You are kind of prepared for online learning. If you are unfamiliar with the software that will be used, that is okay! These programs have quickly become a lot more user friendly, and your school’s IT professionals or computer teacher should be able to answer any questions you have. If you are worried about finding time to talk to teachers, there are many options! Many teachers will talk to you through email, or stay around for a bit after a Zoom meeting to answer questions. If you are worried about a lack of hands-on examples, that is okay! Many classes offer hybrid options, which meet partially in person, and online. Click the tab that matches the type of school you will be attending at the top of the website for more advice!',
        options: [
            {
                text: 'Take survey again',
                nextText: -1
            }
        ]
    },
    //Q3: Prepared Q4: Not Prepared Q5: Not Prepared Q6: Prepared Q7: Prepared 
    {
        id: 1012,
        text: 'Survey complete! You are pretty prepared for online learning! If you are unfamiliar with the software that will be used, consider consulting your schools IT professional, or looking up tutorials online. If you are afraid you will procrastinate during work in an online class, there are ways to help! Try setting aside time each day to do some work. Take time to get ready, and work somewhere with few distractions. This can help to simulate a school setting, and can help your productivity. Click the tab that matches the type of school you will be attending at the top of the website for more advice!',
        options: [
            {
                text: 'Take survey again',
                nextText: -1
            }
        ]
    },
    //Q3: Prepared Q4: Not Prepared Q5: Not Prepared Q6: Prepared Q7: Not Prepared 
    {
        id: 1013,
        text: 'Survey complete! You are kind of prepared for online learning. You are pretty prepared for online learning! If you are unfamiliar with the software that will be used, consider consulting your schools IT professional, or looking up tutorials online. If you are afraid you will procrastinate during work in an online class, there are ways to help! Try setting aside time each day to do some work. Take time to get ready, and work somewhere with few distractions. This can help to simulate a school setting, and can help your productivity. Many teachers will talk to you through email, or stay around for a bit after a Zoom meeting to answer questions, so there is no reason to worry. Click the tab that matches the type of school you will be attending at the top of the website for more advice!',
        options: [
            {
                text: 'Take survey again',
                nextText: -1
            }
        ]
    },
    //Q3: Prepared Q4: Not Prepared Q5: Not Prepared Q6: Not Prepared Q7: Prepared 
    {
        id: 1014,
        text: 'Survey complete! You are kind of prepared for online learning. You are pretty prepared for online learning! If you are unfamiliar with the software that will be used, consider consulting your schools IT professional, or looking up tutorials online. If you are afraid you will procrastinate during work in an online class, there are ways to help! Try setting aside time each day to do some work. Take time to get ready, and work somewhere with few distractions. This can help to simulate a school setting, and can help your productivity. If you are worried about a lack of hands-on examples, that is okay! Many classes offer hybrid options, which meet partially in person, and online. Click the tab that matches the type of school you will be attending at the top of the website for more advice!',
        options: [
            {
                text: 'Take survey again',
                nextText: -1
            }
        ]
    },
    //Q3: Prepared Q4: Not Prepared Q5: Not Prepared Q6: Not Prepared Q7: Not Prepared 
    {
        id: 1015,
        text: 'Survey complete! You are a little prepared for online learning. You are kind of prepared for online learning. You are pretty prepared for online learning! If you are unfamiliar with the software that will be used, consider consulting your schools IT professional, or looking up tutorials online. If you are afraid you will procrastinate during work in an online class, there are ways to help! Try setting aside time each day to do some work. Take time to get ready, and work somewhere with few distractions. This can help to simulate a school setting, and can help your productivity. If you are worried about a lack of hands-on examples, that is okay! Many classes offer hybrid options, which meet partially in person, and online. If you are worried about finding time to talk to teachers, there are many options! Many teachers will talk to you through email, or stay around for a bit after a Zoom meeting to answer questions. Click the tab that matches the type of school you will be attending at the top of the website for more advice!',
        options: [
            {
                text: 'Take survey again',
                nextText: -1
            }
        ]
    },
    //Q3: Not Prepared Q4: Prepared Q5: Prepared Q6: Prepared Q7: Prepared 
    {
        id: 1016,
        text: 'Survey complete! You are very prepared for online learning! Your problem is not having a computer or internet access. If you have a reliable way to access a computer and internet at anytime, such as a family member that lives with you, then you should consider online school! If not, it is best to buy your own computer so you can reliably access it. Click the tab that matches the type of school you will be attending at the top of the website for more advice!',
        options: [
            {
                text: 'Take survey again',
                nextText: -1
            }
        ]
    },
    //Q3: Not Prepared Q4: Prepared Q5: Prepared Q6: Prepared Q7: Not Prepared 
    {
        id: 1017,
        text: 'Survey complete! You are pretty prepared for online learning! Your problem is not having a computer or internet access. If you have a reliable way to access a computer and internet at anytime, such as a family member that lives with you, then you should consider online school! If not, it is best to buy your own computer so you can reliably access it. Click the tab that matches the type of school you will be attending at the top of the website for more advice!',
        options: [
            {
                text: 'Take survey again',
                nextText: -1
            }
        ]
    },
    //Q3: Not Prepared Q4: Prepared Q5: Prepared Q6: Not Prepared Q7: Prepared 
    {
        id: 1018,
        text: 'Survey complete! You are pretty prepared for online learning! Your problem is not having a computer or internet access. If you have a reliable way to access a computer and internet at anytime, such as a family member that lives with you, then you should consider online school! If not, it is best to buy your own computer so you can reliably access it. Click the tab that matches the type of school you will be attending at the top of the website for more advice!',
        options: [
            {
                text: 'Take survey again',
                nextText: -1
            }
        ]
    },
    //Q3: Not Prepared Q4: Prepared Q5: Prepared Q6: Not Prepared Q7: Not Prepared 
    {
        id: 1019,
        text: 'Survey complete! You are kind of prepared for online learning. Your problem is not having a computer or internet access. If you have a reliable way to access a computer and internet at anytime, such as a family member that lives with you, then you should consider online school! If not, it is best to buy your own computer so you can reliably access it. Click the tab that matches the type of school you will be attending at the top of the website for more advice!',
        options: [
            {
                text: 'Take survey again',
                nextText: -1
            }
        ]
    },
    //Q3: Not Prepared Q4: Prepared Q5: Not Prepared Q6: Not Prepared Q7: Prepared 
    {
        id: 1020,
        text: 'Survey complete! You are kind of prepared for online learning. Your problem is not having a computer or internet access. If you have a reliable way to access a computer and internet at anytime, such as a family member that lives with you, then you should consider online school! If not, it is best to buy your own computer so you can reliably access it. Click the tab that matches the type of school you will be attending at the top of the website for more advice!',
        options: [
            {
                text: 'Take survey again',
                nextText: -1
            }
        ]
    },
    //Q3: Not Prepared Q4: Prepared Q5: Not Prepared Q6: Not Prepared Q7: Not Prepared 
    {
        id: 1021,
        text: 'Survey complete! You are a little prepared for online learning. Your problem is not having a computer or internet access. If you have a reliable way to access a computer and internet at anytime, such as a family member that lives with you, then you should consider online school! If not, it is best to buy your own computer so you can reliably access it. Click the tab that matches the type of school you will be attending at the top of the website for more advice!',
        options: [
            {
                text: 'Take survey again',
                nextText: -1
            }
        ]
    },
    //Q3: Not Prepared Q4: Prepared Q5: Not Prepared Q6: Not Prepared Q7: Prepared 
    {
        id: 1022,
        text: 'Survey complete! You are kind of prepared for online learning. Your problem is not having a computer or internet access. If you have a reliable way to access a computer and internet at anytime, such as a family member that lives with you, then you should consider online school! If not, it is best to buy your own computer so you can reliably access it. Click the tab that matches the type of school you will be attending at the top of the website for more advice!',
        options: [
            {
                text: 'Take survey again',
                nextText: -1
            }
        ]
    },
    //Q3: Not Prepared Q4: Prepared Q5: Not Prepared Q6: Not Prepared Q7: Not Prepared 
    {
        id: 1023,
        text: 'Survey complete! You are a little prepared for online learning. Your problem is not having a computer or internet access. If you have a reliable way to access a computer and internet at anytime, such as a family member that lives with you, then you should consider online school! If not, it is best to buy your own computer so you can reliably access it. Click the tab that matches the type of school you will be attending at the top of the website for more advice!',
        options: [
            {
                text: 'Take survey again',
                nextText: -1
            }
        ]
    },
    //Q3: Not Prepared Q4: Not Prepared Q5: Prepared Q6: Prepared Q7: Prepared 
    {
        id: 1024,
        text: 'Survey complete! You are pretty prepared for online learning! Your problem is not having a computer or internet access. If you have a reliable way to access a computer and internet at anytime, such as a family member that lives with you, then you should consider online school! If not, it is best to buy your own computer so you can reliably access it. Click the tab that matches the type of school you will be attending at the top of the website for more advice!',
        options: [
            {
                text: 'Take survey again',
                nextText: -1
            }
        ]
    },
    //Q3: Not Prepared Q4: Not Prepared Q5: Prepared Q6: Prepared Q7: Not Prepared 
    {
        id: 1025,
        text: 'Survey complete! You are kind of prepared for online learning. Your problem is not having a computer or internet access. If you have a reliable way to access a computer and internet at anytime, such as a family member that lives with you, then you should consider online school! If not, it is best to buy your own computer so you can reliably access it. Click the tab that matches the type of school you will be attending at the top of the website for more advice!',
        options: [
            {
                text: 'Take survey again',
                nextText: -1
            }
        ]
    },
    //Q3: Not Prepared Q4: Not Prepared Q5: Prepared Q6: Not Prepared Q7: Prepared 
    {
        id: 1026,
        text: 'Survey complete! You are kind of prepared for online learning. Your problem is not having a computer or internet access. If you have a reliable way to access a computer and internet at anytime, such as a family member that lives with you, then you should consider online school! If not, it is best to buy your own computer so you can reliably access it. Click the tab that matches the type of school you will be attending at the top of the website for more advice!',
        options: [
            {
                text: 'Take survey again',
                nextText: -1
            }
        ]
    },
    //Q3: Not Prepared Q4: Not Prepared Q5: Prepared Q6: Not Prepared Q7: Not Prepared 
    {
        id: 1027,
        text: 'Survey complete! You are a little prepared for online learning. Your problem is not having a computer or internet access. If you have a reliable way to access a computer and internet at anytime, such as a family member that lives with you, then you should consider online school! If not, it is best to buy your own computer so you can reliably access it. Click the tab that matches the type of school you will be attending at the top of the website for more advice!',
        options: [
            {
                text: 'Take survey again',
                nextText: -1
            }
        ]
    },
    //Q3: Not Prepared Q4: Not Prepared Q5: Not Prepared Q6: Prepared Q7: Prepared 
    {
        id: 1028,
        text: 'Survey complete! You are kind of prepared for online learning. Your problem is not having a computer or internet access. If you have a reliable way to access a computer and internet at anytime, such as a family member that lives with you, then you should consider online school! If not, it is best to buy your own computer so you can reliably access it. Click the tab that matches the type of school you will be attending at the top of the website for more advice!',
        options: [
            {
                text: 'Take survey again',
                nextText: -1
            }
        ]
    },
    //Q3: Not Prepared Q4: Not Prepared Q5: Not Prepared Q6: Prepared Q7: Not Prepared 
    {
        id: 1029,
        text: 'Survey complete! You are a little prepared for online learning. Your problem is not having a computer or internet access. If you have a reliable way to access a computer and internet at anytime, such as a family member that lives with you, then you should consider online school! If not, it is best to buy your own computer so you can reliably access it. Click the tab that matches the type of school you will be attending at the top of the website for more advice!',
        options: [
            {
                text: 'Take survey again',
                nextText: -1
            }
        ]
    },
    //Q3: Not Prepared Q4: Not Prepared Q5: Not Prepared Q6: Not Prepared Q7: Prepared 
    {
        id: 1030,
        text: 'Survey complete! You are a little prepared for online learning. Your problem is not having a computer or internet access. If you have a reliable way to access a computer and internet at anytime, such as a family member that lives with you, then you should consider online school! If not, it is best to buy your own computer so you can reliably access it. Click the tab that matches the type of school you will be attending at the top of the website for more advice!',
        options: [
            {
                text: 'Take survey again',
                nextText: -1
            }
        ]
    },
    //Q3: Not Prepared Q4: Not Prepared Q5: Not Prepared Q6: Not Prepared Q7: Not Prepared 
    {
        id: 1031,
        text: 'Survey complete! You are not prepared for online learning. Your problem is not having a computer or internet access. If you have a reliable way to access a computer and internet at anytime, such as a family member that lives with you, then you should consider online school! If not, it is best to buy your own computer so you can reliably access it. Unless you are willing to make a large effort, online classes might not be worth it to you. Click the tab that matches the type of school you will be attending at the top of the website for more advice!',
        options: [
            {
                text: 'Take survey again',
                nextText: -1
            }
        ]
    },
    //Stuent questions END

    //Teacher questions BEGIN
    {
        id: 12,
        text: 'Have you taught an online class previously?',
        options: [
            {
                text: 'Yes',
                nextText: 13
            },
            {
                text: 'No',
                nextText: 21
            }
        ]
    },
    {
        id: 13,
        text: 'Are you willing to attending a workshop for online teaching?',
        options: [
            {
                text: 'Yes',
                nextText: 14
            },
            {
                text: 'No',
                nextText: 14
            }
        ]
    },
    {
        id: 14,
        text: 'Would you be able to use software like Zoom to simulate a classroom environment though video call?',
        options: [
            {
                text: 'Yes',
                nextText: 15
            },
            {
                text: 'No',
                nextText: 15
            }
        ]
    },
    {
        id: 15,
        text: 'Are you familiar with asynchronous learning?',
        options: [
            {
                text: 'Yes',
                nextText: 16
            },
            {
                text: 'No',
                nextText: 16
            }
        ]
    },
    {
        id: 16,
        text: 'Did you ever used a computer or the internet to supplement teaching previously?',
        options: [
            {
                text: 'Yes',
                nextText: 22
            },
            {
                text: 'No',
                nextText: 17
            }
        ]
    },
    {
        id: 17,
        text: 'Are you willing to record video lectures?',
        options: [
            {
                text: 'Yes',
                nextText: 18
            },
            {
                text: 'No',
                nextText: 18
            }
        ]
    },
    {
        id: 18,
        text: 'Do you have the diligence to check your email multiple times a day?',
        options: [
            {
                text: 'Yes',
                nextText: 19
            },
            {
                text: 'No',
                nextText: 19
            }
        ]
    },
    {
        id: 19,
        text: 'Do you have the necessary equipment at home to teach the class?',
        options: [
            {
                text: 'Yes',
                nextText: 20
            },
            {
                text: 'No',
                nextText: 20
            }
        ]
    },
    {
        id: 20,
        text: 'Survey Complete! Information pages coming soon!\n\nWant to take it again??',
        options: [
            {
                text: 'Play Again',
                nextText: -1
            }
        ]
    },
    //Teacher question I forgot!
    {
        id: 21,
        text: 'Do you feel capable of presenting your current class in an online format?',
        options: [
            {
                text: 'Yes',
                nextText: 13
            },
            {
                text: 'No',
                nextText: 13
            }
        ]
    },
    {
        id: 22,
        text: 'Could you use this resource in an online class?',
        options: [
            {
                text: 'Yes',
                nextText: 17
            },
            {
                text: 'No',
                nextText: 17
            }
        ]
    }
]

startGame()