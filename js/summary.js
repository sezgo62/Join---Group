
let todo2 = [{
    'category': {'name': 'Design','color': '#FF7A00'},
    'title': 'Website redesign',
    'description': "Modify the contents of the main website. Adjust the UI to the company's brand design.",
    'progress': 0,
    'subtasks': 1,
    'team': [
        {
            'name': 'Simon Meyer',
            'color': '#0190E0',
            'email': 'simon.meyer@gmail.com',
            'phone': '+49 0123 456 78 9'
        },{
            'name': 'Maximilian Vogel',
            'color': '#EE00D6',
            'email': 'maximilian.vogel@gmail.com',
            'phone': '+49 0123 456 78 9'
        }
    ],
    'prior': {
        'name': 'Mid',
        'image': 'assets/img/green.png',
        'color': '#7AE229'
    },
    'board': 0,
    'due-date': 'December 21, 2022'
},
{
    'category': {'name': 'Media','color': '#29ABE2'},
    'title': 'New Interview',
    'description': "Making an interview with someone on the planet earth.",
    'progress': 0,
    'subtasks': 2,
    'team': [
        {
            'name': 'Simon Meyer',
            'color': '#0190E0',
            'email': 'simon.meyer@gmail.com',
            'phone': '+49 0123 456 78 9'
        },{
            'name': 'Maximilian Vogel',
            'color': '#EE00D6',
            'email': 'maximilian.vogel@gmail.com',
            'phone': '+49 0123 456 78 9'
        },{
            'name': 'Eva Fischer',
            'color': '#02CF2F',
            'email': 'Eva.Fischer@gmail.com',
            'phone': '+49 0123 456 78 9'
        },{
            'name': 'Kevin Schumilo',
            'color': '#02CF2F',
            'email': 'Eva.Fischer@gmail.com',
            'phone': '+49 0123 456 78 9'
        }
    ],
    'prior': {
        'name': 'Mid',
        'image': './assets/img/red-prio.svg',
        'color': '#FF3D00'
    },
    'board': 0,
    'due-date': '29.12.22'
},
{
    'category': {'name': 'Media','color': '#29ABE2'},
    'title': 'New Interview',
    'description': "Making an interview with someone on the planet earth.",
    'progress': 0,
    'subtasks': 2,
    'team': [
        {
            'name': 'Simon Meyer',
            'color': '#0190E0',
            'email': 'simon.meyer@gmail.com',
            'phone': '+49 0123 456 78 9'
        },{
            'name': 'Maximilian Vogel',
            'color': '#EE00D6',
            'email': 'maximilian.vogel@gmail.com',
            'phone': '+49 0123 456 78 9'
        },{
            'name': 'Eva Fischer',
            'color': '#02CF2F',
            'email': 'Eva.Fischer@gmail.com',
            'phone': '+49 0123 456 78 9'
        },{
            'name': 'Kevin Schumilo',
            'color': '#02CF2F',
            'email': 'Eva.Fischer@gmail.com',
            'phone': '+49 0123 456 78 9'
        }
    ],
    'prior': {
        'name': 'Mid',
        'image': './assets/img/red-prio.svg',
        'color': '#FF3D00'
    },
    'board': 0,
    'due-date': '23.1.22'
},
{
    'category': {'name': 'Media','color': '#29ABE2'},
    'title': 'New Interview',
    'description': "Making an interview with someone on the planet earth.",
    'progress': 0,
    'subtasks': 2,
    'team': [
        {
            'name': 'Simon Meyer',
            'color': '#0190E0',
            'email': 'simon.meyer@gmail.com',
            'phone': '+49 0123 456 78 9'
        },{
            'name': 'Maximilian Vogel',
            'color': '#EE00D6',
            'email': 'maximilian.vogel@gmail.com',
            'phone': '+49 0123 456 78 9'
        },{
            'name': 'Eva Fischer',
            'color': '#02CF2F',
            'email': 'Eva.Fischer@gmail.com',
            'phone': '+49 0123 456 78 9'
        },{
            'name': 'Kevin Schumilo',
            'color': '#02CF2F',
            'email': 'Eva.Fischer@gmail.com',
            'phone': '+49 0123 456 78 9'
        }
    ],
    'prior': {
        'name': 'Mid',
        'image': './assets/img/red-prio.svg',
        'color': '#FF3D00'
    },
    'board': 0,
    'due-date': '16.12.22'
}];




function greet() {
    
    let today = new Date()
    let hour = today.getHours()
    
    
    if (hour < 11 && hour >= 07) {
        document.getElementById('greet').innerHTML = `Guten Morgen`;
    } else if (hour >= 11 && hour < 18) {
        document.getElementById('greet').innerHTML = `Guten Mittag`;
    } else if(hour >= 18) {
        document.getElementById('greet').innerHTML = `Guten Abend`;
    }
}



/**
 * This function renders informations about the number of tasks in the categories
 * 
 * 
 */
function renderSummary() {
    document.getElementById('task-count1').innerHTML = `${boardColumns[0].length}`;
    document.getElementById('task-count2').innerHTML = `${boardColumns[1].length}`;
    document.getElementById('task-count3').innerHTML = `${boardColumns[2].length}`;

    document.getElementById('task-info-count').innerHTML = `${boardColumns[0].length}`;
    document.getElementById('task-info-count2').innerHTML = `${boardColumns[3].length}`;
    

    // if (task[0]['prior']=='assets/img/green.png') {
    //     document.getElementById('priority-Icon').src = 'assets/img/summary-arrow-up-icon.png';
    // }      

filterPriorities();

   
}

    let urgent = 0;
    let mid = 0;
    let low = 0;
   
function filterPriorities() {

    for (let j = 0; j < todo2.length; j++) {
        const element2 = todo2[j];
        
        if(element2.prior.name == 'Urgent') {
                urgent++;
            } else if(element2.prior.name == 'Mid') {
                mid++;
            } else if(element2.prior.name == 'Low') {
                low++;
            }

            renderPriorityContainer(j);

}
}
 

function renderPriorityContainer(j) {
    if(urgent >= 1) {
        document.getElementById('priority-Icon').src = 'assets/img/red.png';
        document.getElementById('priority-Icon').classList.add('priority-Icon');
        document.getElementById('priorities-radius').classList.remove('priorities-radius-mid');
        document.getElementById('priorities-radius').classList.remove('priorities-radius-low');
        document.getElementById('priorities-radius').classList.add('priorities-radius-urgent');
        document.getElementById('priority-count').innerHTML = `${urgent}`;
        document.getElementById('priority-text').innerHTML = `Urgent`;

        if(todo2[j].prior.name == 'Urgent') {
            document.getElementById('date').innerHTML = `${todo2[j]['due-date']}`;
        }
    }
        
     else if(mid > low) {
        document.getElementById('priority-Icon').src = 'assets/img/orange.png';
        document.getElementById('priority-Icon').classList.add('priority-Icon');
        document.getElementById('priorities-radius').classList.remove('priorities-radius-urgent');
        document.getElementById('priorities-radius').classList.remove('priorities-radius-low');
        document.getElementById('priorities-radius').classList.add('priorities-radius-mid');
        document.getElementById('priority-count').innerHTML = `${mid}`;
        document.getElementById('priority-text').innerHTML = 'Mid';
    } else if(low > mid) {
        document.getElementById('priority-Icon').src = 'assets/img/green.png';
        document.getElementById('priority-Icon').classList.add('priorities-Color');
        document.getElementById('priorities-radius').classList.remove('priorities-radius-urgent');
        document.getElementById('priorities-radius').classList.remove('priorities-radius-mid');
        document.getElementById('priorities-radius').classList.add('priorities-radius-low');
        document.getElementById('priority-count').innerHTML = `${low}`;
        document.getElementById('priority-text').innerHTML = 'Low';
    }
}