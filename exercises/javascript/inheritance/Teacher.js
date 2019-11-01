class Teacher extends Person {
  constructor(first, last, age, gender, interests, subject, grade) {
    super(first, last, age, gender, interests)
    this._subject = subject
    this._students = []
  }

  get subject() {
    return this._subject
  }
  
  set subject(newSubject) {
    this._subject = newSubject
  }

  get students() {
    return this._students
  }
  
  set students(newStudent) {
    this._students.push(newStudent)
  }

  setGradeForStudent(param, grade) {
    for (const student of this._students) {      
      if (student.name.first === param.name.first && student.name.last === param.name.last) {
        let subject = { name: this._subject, grade: grade }
        student.subjects = subject

        return true
      }
    }

    return false
  }
}