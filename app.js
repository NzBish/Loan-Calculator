//listen for submit
document.querySelector('#loan-form').addEventListener('submit', function(e){
    //Hide Results
    document.getElementById('results').style.display = 'none';
    //Show loader
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

//Calculate Results

function calculateResults(e){

    //UI Variables
    const amount =  document.getElementById('amount');
    const interest =  document.getElementById('interest');
    const years =  document.getElementById('years');
    const monthlyPayment =  document.getElementById('monthly-payment');
    const totalPayment =  document.getElementById('total-payment');
    const totalInterest =  document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value)/ 100 / 12;
    const calculatedPayments = parseFloat(years.value)*12;

    //Monthly payment calculations
    const x = Math.pow(1+calculatedInterest,calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
        //display results and hide spinner
        document.getElementById('results').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
    } else{
      showError('Please fill in all fields');
    }
    

}

//Error message
function showError(error){

    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'none';
   
    //Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //Create div
    const errorDiv = document.createElement('div');   
    //add class
    errorDiv.className = 'alert alert-danger'

    //Create text node and append
    errorDiv.appendChild(document.createTextNode(error));

    //insert error
    card.insertBefore(errorDiv,heading);

    //Clear error
    setTimeout(clearError, 3000);
}

//Clear error
function clearError(){
    document.querySelector('.alert').remove();
}