module.exports = function (app) {

    app.use("/users", require('./users/users.controller')(app));
    app.use("/login", require('./session/session.controller')(app));
    app.use("/anaerobicExercises", require('./exercises/anaerobicExercise.controller')(app));
    app.use("/anaerobicExercises", require('./marks/anaerobicMark.controller')(app));
    app.use("/aerobicExercises", require('./exercises/aerobicExercise.controller')(app));
    app.use("/aerobicExercises", require('./marks/aerobicMark.controller')(app));
    app.use("/bodyAnalisis", require('./bodyAnalisis/bodyAnalisis.controller')(app));

};
