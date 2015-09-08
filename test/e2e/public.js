var hasClass = function (element, cls) {
    return element.getAttribute('class').then(function (classes) {
        return classes.split(' ').indexOf(cls) !== -1;
    });
};

module.exports.hasClass = hasClass;

var validRequired = function(element){
    
    return hasClass(element, 'ng-valid-required') //someService.fnReturnsPromise()
    .then(function(resultsOfSecondFn) {
        return (resultsOfSecondFn || hasClass(element, 'ng-invalid-required') ) ? true: false; //someService.fnReturnsAnotherPromise(someArg);
    })
    .then(function(resultsOfSecondFn) {
        // do work with results, it is already unwrapped
        return resultsOfSecondFn;
    });
    
};
module.exports.validRequired = validRequired;
