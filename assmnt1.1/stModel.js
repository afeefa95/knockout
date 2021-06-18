function student(){
	var self = this;
	self.firstName = ko.observable("") //y
	self.lastName = ko.observable("") //y
	console.debug(self.firstName());
	self.dayOptionValues = generateDays();
	self.daySelectedOptionValue = ko.observable("Day");
	self.monthOptionValues = ["Month","Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
	self.monthSelectedOptionValue = ko.observable("Month");
	self.yearOptionValues = generateYearsBetween(1990, 2021);
	self.yearSelectedOptionValue = ko.observable("Year");
	self.dob = ko.computed(function (){
		return self.daySelectedOptionValue() + " " + self.monthSelectedOptionValue() + "," + self.yearSelectedOptionValue();
	}, this); //y
	
	self.email = ko.observable("") //y
	self.mobile = ko.observable("") //y
	self.genderSelected = ko.observable("Male"); //y
	self.address = ko.observable(""); //y
	self.city = ko.observable(""); //y
	self.zip = ko.observable(""); //y
	self.stateOptionValues = ["Delhi","Uttar Pradesh","Tamil Nadu","Maharashtra"];
	self.stateSelectedOptionValue = ko.observable("Delhi"); //y
	self.countryOptionValues = ["India"];
	self.countrySelectedOptionValue = ko.observable("India"); //y
	self.hobbyDrawing = ko.observable(true);
	self.hobbySinging = ko.observable(true);
	self.hobbyDancing = ko.observable(true);
	self.hobbyOthers = ko.observable(true);
	self.otherHobbiesText = ko.observable("");
	
	self.hobbies = ko.observableArray();  //y
	
	self.xEnglish = ko.observable("");
	self.xHindi = ko.observable("");
	self.xMathematics = ko.observable("");
	self.xScience = ko.observable("");
	self.xSocial = ko.observable("");
	self.xiiEnglish = ko.observable("");
	self.xiiHindi = ko.observable("");
	self.xiiMathematics = ko.observable("");
	self.xiiScience = ko.observable("");
	self.xiiSocial = ko.observable("");
	
	self.xtotal = ko.computed(function (){
		return Number(self.xEnglish()) + Number(self.xHindi()) + Number(self.xMathematics()) + Number(self.xScience()) + Number(self.xSocial());
	}, this); //y
	
	self.xiitotal = ko.computed(function (){
		return Number(self.xiiEnglish()) + Number(self.xiiHindi()) + Number(self.xiiMathematics()) + Number(self.xiiScience()) + Number(self.xiiSocial());
	}, this); //y
	
	self.courseApplied = ko.observable(""); //y
	self.agreeTerms = ko.observable(false); //y
}

var studentsModel = function(){
	var self = this;
	self.students = ko.observableArray();
	self.currStudent = ko.observable(new student());	
	self.showResult = ko.observable(false);
	self.firstNameEditable = ko.observable(true);
	
	self.validationRules = function () {
        self.currStudent().firstName.extend({ minLength: 2, required: true});
        self.currStudent().lastName.extend({ minLength: 2, required: true });
        self.currStudent().email.extend({ email: true, required: true });
        self.currStudent().mobile.extend({ phoneUS: true, required: true });
        self.currStudent().xEnglish.extend({ min: 30, max: 100 });
        self.currStudent().xHindi.extend({ min: 30, max: 100 });
        self.currStudent().xMathematics.extend({ min: 30, max: 100 });
        self.currStudent().xScience.extend({ min: 30, max: 100 });
        self.currStudent().xSocial.extend({ min: 30, max: 100 });
        self.currStudent().xiiEnglish.extend({ min: 30, max: 100 });
        self.currStudent().xiiHindi.extend({ min: 30, max: 100 });
        self.currStudent().xiiMathematics.extend({ min: 30, max: 100 });
        self.currStudent().xiiScience.extend({ min: 30, max: 100 });
        self.currStudent().xiiSocial.extend({ min: 30, max: 100 });
      };

    self.validationRules();
	
	self.validateNowFunc = function () {
        self.currStudent().firstName.isModified(true);
        self.currStudent().lastName.isModified(true);
        self.currStudent().email.isModified(true);
        self.currStudent().mobile.isModified(true);

        self.currStudent().xEnglish.isModified(true);
        self.currStudent().xHindi.isModified(true);
        self.currStudent().xMathematics.isModified(true);
        self.currStudent().xScience.isModified(true);
        self.currStudent().xSocial.isModified(true);
        self.currStudent().xiiEnglish.isModified(true);
        self.currStudent().xiiHindi.isModified(true);
        self.currStudent().xiiMathematics.isModified(true);
        self.currStudent().xiiScience.isModified(true);
        self.currStudent().xiiSocial.isModified(true);
        //return self.currStudent().firstName.isValid();
      };
	  
	self.doNotValidateNow = function () {
        self.currStudent().firstName.isModified(false);
        self.currStudent().lastName.isModified(false);
        self.currStudent().email.isModified(false);
        self.currStudent().mobile.isModified(false);

        self.currStudent().xEnglish.isModified(false);
        self.currStudent().xHindi.isModified(false);
        self.currStudent().xMathematics.isModified(false);
        self.currStudent().xScience.isModified(false);
        self.currStudent().xSocial.isModified(false);
        self.currStudent().xiiEnglish.isModified(false);
        self.currStudent().xiiHindi.isModified(false);
        self.currStudent().xiiMathematics.isModified(false);
        self.currStudent().xiiScience.isModified(false);
        self.currStudent().xiiSocial.isModified(false);
      };
	
	self.resetFunc = function() {
        self.currStudent().firstName("");
        self.currStudent().lastName("");
        self.currStudent().daySelectedOptionValue("Day");
        self.currStudent().monthSelectedOptionValue("Month");
        self.currStudent().yearSelectedOptionValue("Year");
        self.currStudent().email("");
        self.currStudent().mobile("");
        self.currStudent().genderSelected("Male");
        self.currStudent().address("");
        self.currStudent().city("");
        self.currStudent().zip("");
        self.currStudent().stateSelectedOptionValue("Delhi");
        self.currStudent().countrySelectedOptionValue("India");
        self.currStudent().hobbyDrawing(false);
        self.currStudent().hobbySinging(false);
        self.currStudent().hobbyDancing(false);
        self.currStudent().hobbyOthers(false);
        self.currStudent().otherHobbiesText();
        self.currStudent().xEnglish(0);
        self.currStudent().xHindi(0);
        self.currStudent().xMathematics(0);
        self.currStudent().xScience(0);
        self.currStudent().xSocial(0);
        self.currStudent().xiiEnglish(0);
        self.currStudent().xiiHindi(0);
        self.currStudent().xiiMathematics(0);
        self.currStudent().xiiScience(0);
        self.currStudent().xiiSocial(0);
        self.currStudent().courseApplied("BCA");
        self.currStudent().agreeTerms(false);
        self.doNotValidateNow();
      }

      self.resultFunc = function () {
        self.showResult(true);
        console.log("in result");
        var tempList = JSON.parse(localStorage.getItem("students"));
        if (tempList != null) {
          self.students.removeAll();
          console.log(self.students().length);
          // push.apply() to add multiple items
          self.students.push.apply(self.students, tempList);
        }
        console.log(self.students().length);
      };
      self.submitFunc = function () {
        console.log("in submit");
        self.validateNowFunc();
        var errors = ko.validation.group(self.currStudent());
        console.log(errors());
        if (errors().length > 0) {
          alert("Please fix all errors before proceeding!");
          //            errors.showAllMessages(true);
        } else {
          if (self.currStudent().agreeTerms()) {
            self.firstNameEditable(true);
            self.showResult(false);
            self.currStudent().hobbies([]);

            // adding items in hobbies array
            if (self.currStudent().hobbyDrawing())
              self.currStudent().hobbies.push("Drawing");
            if (self.currStudent().hobbySinging())
              self.currStudent().hobbies.push("Singing");
            if (self.currStudent().hobbyDancing())
              self.currStudent().hobbies.push("Dancing");
            if (
              self.currStudent().hobbyOthers() &&
              self.currStudent().otherHobbiesText() != undefined
            ) {
              var h = self
                .currStudent()
                .otherHobbiesText()
                .toString()
                .split(",");
              self
                .currStudent()
                .hobbies.push.apply(self.currStudent().hobbies, h);
            }

            // getting all students in array
            var existingEntries = JSON.parse(localStorage.getItem("students"));
            if (existingEntries == null) existingEntries = [];

            var index = existingEntries.findIndex(function (stu) {
              return stu.firstName == self.currStudent().firstName();
            });
            //removing the student if already exists while update
            if (index != -1) {
              existingEntries.splice(index, 1);
            }
            console.log(index);
            // adding new student in array
            existingEntries.push(self.currStudent());
            // setting new student in local storage
            localStorage.setItem("students", ko.toJSON(existingEntries));
            alert("Details has been saved!");
            self.resetFunc();
          } else {
            alert("Click on checkbox before submitting the information!");
          }
        }
      };
      self.removeStudent = function (student) {
        console.log("in remove");
        self.students.remove(student);
        console.log(self.students().length);
        localStorage.setItem("students", ko.toJSON(self.students));
      };
      self.editStudent = function (stu) {
        self.firstNameEditable(false);
        self.showResult(false);
        console.log("in edit");
        console.log(stu);
        //self.updateFunc(stu);
        // var editableStudent = new self.student();

        // Object.assign(editableStudent, ko.mapping.fromJS(stu));
        // self.currStudent(editableStudent);

        // //self.currStudent(ko.mapping.fromJS(stu));
        // setTimeout(function() {self.validationRules()},1000);
        // console.log("current student:");
        // console.log(self.currStudent());
        //self.currStudent().agreeTerms(false);

        self.currStudent().firstName(stu.firstName ? stu.firstName : "");
        self.currStudent().lastName(stu.lastName ? stu.lastName : "");
        self.currStudent().daySelectedOptionValue(stu.daySelectedOptionValue ? stu.daySelectedOptionValue : "Day");
        self.currStudent().monthSelectedOptionValue(stu.monthSelectedOptionValue ? stu.monthSelectedOptionValue : "Month");
        self.currStudent().yearSelectedOptionValue(stu.yearSelectedOptionValue ? stu.yearSelectedOptionValue : "Year");
        self.currStudent().email(stu.email ? stu.email : "");
        self.currStudent().mobile(stu.mobile ? stu.mobile : "");
        self.currStudent().genderSelected(stu.genderSelected ? stu.genderSelected : "Male");
        self.currStudent().address(stu.address ? stu.address : "");
        self.currStudent().city(stu.city ? stu.city : "");
        self.currStudent().zip(stu.zip ? stu.zip : "");
        self.currStudent().stateSelectedOptionValue(stu.stateSelectedOptionValue ? stu.stateSelectedOptionValue : "Delhi");
        self.currStudent().countrySelectedOptionValue(stu.countrySelectedOptionValue ? stu.countrySelectedOptionValue : "India");
        self.currStudent().hobbyDrawing(stu.hobbyDrawing ? stu.hobbyDrawing : false);
        self.currStudent().hobbySinging(stu.hobbySinging ? stu.hobbySinging : false);
        self.currStudent().hobbyDancing(stu.hobbyDancing ? stu.hobbyDancing :  false);
        self.currStudent().hobbyOthers(stu.hobbyOthers ? stu.hobbyOthers : false);
        self.currStudent().otherHobbiesText(stu.otherHobbiesText ? stu.otherHobbiesText : undefined);
        self.currStudent().xEnglish(stu.xEnglish ? stu.xEnglish : 0);
        self.currStudent().xHindi(stu.xHindi ? stu.xHindi : 0);
        self.currStudent().xMathematics(stu.xMathematics ? stu.xMathematics : 0);
        self.currStudent().xScience(stu.xScience ? stu.xScience : 0);
        self.currStudent().xSocial(stu.xSocial ? stu.xSocial : 0);
        self.currStudent().xiiEnglish(stu.xiiEnglish ? stu.xiiEnglish : 0);
        self.currStudent().xiiHindi(stu.xiiHindi ? stu.xiiHindi : 0);
        self.currStudent().xiiMathematics(stu.xiiMathematics ? stu.xiiMathematics : 0);
        self.currStudent().xiiScience(stu.xiiScience ? stu.xiiScience : 0);
        self.currStudent().xiiSocial(stu.xiiSocial ? stu.xiiSocial : 0);
        self.currStudent().courseApplied(stu.courseApplied ? stu.courseApplied : "BCA");
        self.currStudent().agreeTerms(stu.agreeTerms ? stu.agreeTerms : false);
      };
};

function generateYearsBetween(startYear = 1990, endYear) {
  const endDate = endYear || new Date().getFullYear();
  let years = [];
  years.push("Year");
  for (var i = startYear; i <= endDate; i++) {
    years.push(startYear);
    startYear++;
  }
  return years;
}

function generateDays() {
  let days = [];
  days.push("Day");
  for (var i = 1; i <= 31; i++) {
    days.push(i);
  }
  return days;
}

ko.applyBindings(new studentsModel());