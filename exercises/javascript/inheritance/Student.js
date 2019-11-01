class Student extends Person {
  constructor(first, last, age, gender, interests) {
    super(first, last, age, gender, interests)

    this._subjects = []
  }

  get subjects() {
    return this._subjects
  }
  
  set subjects(param) {
    let updated = false
    
    // update existing subject if found
    this._subjects.forEach((subject) => {
      if (subject.name === param.name) {
        subject.grade = param.grade
        updated = true
      }
    });

    // add new subject
    if (!updated) {
      this._subjects.push(param)
    }
  }
}