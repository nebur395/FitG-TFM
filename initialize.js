const mongoose = require('mongoose'),
    express = require('express'),
    models = require('./server/models'),
    winston = require('winston');

const app = express(),
    dbUri = 'mongodb://localhost:27017/fitgDb',
    AnaerobicExercise = models.AnaerobicExercise,
    AerobicExercise = models.AerobicExercise;

const anaerobicExercises = [
        {
            name: "press banca",
            category: "muscle training",
            type: "chest",
            custom: false,
            description: "Press banca test description."
        },
        {
            name: "pulley",
            category: "muscle training",
            type: "back",
            custom: false,
            description: "Pulley test description."
        },
        {
            name: "shoulder press",
            category: "muscle training",
            type: "shoulder",
            custom: false,
            description: "Shoulder press test description."
        },
        {
            name: "pulley triceps",
            category: "muscle training",
            type: "triceps",
            custom: false,
            description: "Pulley triceps test description."
        },
        {
            name: "hammer",
            category: "muscle training",
            type: "biceps",
            custom: false,
            description: "Hammer test description."
        },
        {
            name: "leg curl",
            category: "muscle training",
            type: "legs",
            custom: false,
            description: "Leg curl test description."
        },
        {
            name: "gluteus machine",
            category: "muscle training",
            type: "gluteus",
            custom: false,
            description: "Gluteus machine test description."
        },
        {
            name: "oblique abs",
            category: "muscle training",
            type: "abs",
            custom: false,
            description: "Oblique abs test description."
        }
    ],
    aerobicExercises = [
        {
            name: "trail running",
            category: "running",
            type: "trail running",
            custom: false,
            description: "Trail running test description."
        },
        {
            name: "cross running",
            category: "running",
            type: "cross running",
            custom: false,
            description: "Cross running test description."
        },
        {
            name: "sprint",
            category: "running",
            type: "sprint",
            custom: false,
            description: "Sprint test description."
        },
        {
            name: "butterfly",
            category: "swimming",
            type: "butterfly",
            custom: false,
            description: "Butterfly test description."
        },
        {
            name: "crawl",
            category: "swimming",
            type: "crawl",
            custom: false,
            description: "Crawl test description."
        }
    ];

mongoose.connect(dbUri);
mongoose.connection.once('open', function () {

    winston.info("MongoDB connection created in " + dbUri);

    AnaerobicExercise.insertMany(anaerobicExercises)
        .then(docs => {

            winston.info('%d anaerobic exercises were successfully stored.', docs.length);
            AerobicExercise.insertMany(aerobicExercises)
                .then(docs => {

                    winston.info('%d anaerobic exercises were successfully stored.', docs.length);
                    mongoose.connection.close();
                })
                .catch(err => {
                    winston.info('An error has occurred during the aerobic exercises creation: ');
                    winston.info(err);
                    mongoose.connection.close();
                });
        })
        .catch(err => {
            winston.info('An error has occurred during the aerobic exercises creation: ');
            winston.info(err);
            mongoose.connection.close();
        });
});
