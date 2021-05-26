function student(){
	var self = this;
	self.firstName = ko.observable("").extend({ minLength: 2, required: true}); //y
	self.lastName = ko.observable("").extend({ minLength: 2, required: true}); //y
	
	self.dayOptionValues = generateDays();
	self.daySelectedOptionValue = ko.observable("Day");
	self.monthOptionValues = ["Month","Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
	self.monthSelectedOptionValue = ko.observable("Month");
	self.yearOptionValues = generateYearsBetween(1990, 2021);
	self.yearSelectedOptionValue = ko.observable("Year");
	self.dob = ko.computed(function (){
		return self.daySelectedOptionValue() + " " + self.monthSelectedOptionValue() + "," + self.yearSelectedOptionValue();
	}, this); //y
	
	self.email = ko.observable("").extend({ email: true, required: true }); //y
	self.mobile = ko.observable("").extend({ phoneUS: true, required: true }); //y
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
	self.resultFunc = function(){
		self.showResult(true);
		console.log("in result");
		var tempList = JSON.parse(localStorage.getItem("students"));
		if(tempList != null){
			self.students.removeAll();
			console.log(self.students().length);
			// push.apply() to add multiple items
			self.students.push.apply(self.students, tempList);
		}
		console.log(self.students().length);
	};
	self.submitFunc = function(){
		console.log("in submit");
		var errors = ko.validation.group(self.currStudent());
		console.log(errors());
		if(errors().length > 0){
			alert("Please fix all errors before proceeding!");
			errors.showAllMessages(true);
		}
		else{
			if (self.currStudent().agreeTerms()){
			self.firstNameEditable(true);
			self.showResult(false);
			self.currStudent().hobbies([]);
			
			// adding items in hobbies array
			if(self.currStudent().hobbyDrawing())
				self.currStudent().hobbies.push("Drawing");
			if(self.currStudent().hobbySinging())
				self.currStudent().hobbies.push("Singing");
			if(self.currStudent().hobbyDancing())
				self.currStudent().hobbies.push("Dancing");
			if(self.currStudent().hobbyOthers()){
				var h = self.currStudent().otherHobbiesText().toString().split(" ");
				self.currStudent().hobbies.push.apply(self.currStudent().hobbies, h);
			}
			
			// getting all students in array
			var existingEntries = JSON.parse(localStorage.getItem("students"));
			if(existingEntries == null) existingEntries = [];
			
			var index = existingEntries.findIndex(function(stu){
				return stu.firstName == self.currStudent().firstName();
			})		
			//removing the student if already exists while update
			if(index != -1){
				existingEntries.splice(index, 1);
			}		
			console.log(index);
			// adding new student in array
			existingEntries.push(self.currStudent());
			// setting new student in local storage
			localStorage.setItem('students', ko.toJSON(existingEntries));
			alert("Details has been saved!");
			self.currStudent(new student());			
			}
			else{
				alert("Click on checkbox before submitting the information!");
			}
		}
	};
	self.removeStudent = function(student) { 
		console.log("in remove");
		self.students.remove(student);
		console.log(self.students().length);
		localStorage.setItem('students', ko.toJSON(self.students));
	};
	self.editStudent = function(stu) {
		self.firstNameEditable(false);
		self.showResult(false);
		console.log("in edit");
		console.log(stu);		
		self.currStudent(ko.mapping.fromJS(stu));
//		console.log(isObservable(a.firstName));
		console.log("current student:"); 
		console.log(self.currStudent());
		self.currStudent().agreeTerms(false);
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