const chaiHttp = require("chai-http");
const chai = require("chai");
const app = require("../app");
require("dotenv").config();

const dbConnect = require("../config");
const User = require("../models/User");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Test with mongoDB database", function() {
  dbConnect();

  async function deleteTestUser(done) {
    await User.findOneAndDelete({ email: "testcode@testcode.com" }, done());
  }

  after(function(done) {
    deleteTestUser(done);
  });

  describe("POST /auth/signup", function() {
    const userInfo = {
      email: "testcode@testcode.com",
      password: "test123!",
      username: "testcode"
    };

    it("should create new member", function(done) {
      this.timeout(5000);

      chai
        .request(app)
        .post("/auth/signup")
        .send({ ...userInfo })
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.successMessage).to.equal("회원 가입 완료.");
          done();
        });
    });
  });

  describe("POST /auth/signin", function() {
    const userInfo = {
      email: "testcode@testcode.com",
      password: "test123!"
    };

    it("should return user information", function(done) {
      this.timeout(5000);

      chai
        .request(app)
        .post("/auth/signin")
        .send({ ...userInfo })
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.user).to.have.property("favorite");
          expect(res.body.isAuthenticated).to.equal(true);
          done();
        });
    });
  });

  describe("GET /comment/:place_id", function() {
    const placeId = "5dde0256f3890c35f68cb3d4";

    it("should return all comments of the place", function(done) {
      this.timeout(5000);

      chai
        .request(app)
        .get(`/comment/${placeId}`)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(Array.isArray(res.body.comments)).to.equal(true);
          done();
        });
    });
  });

  describe("GET /place", function() {
    it("should return all uploaded place", function(done) {
      this.timeout(8000);

      chai
        .request(app)
        .get("/place")
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body[0]).to.have.property("title");
          done();
        });
    });
  });

  describe("GET /place/search", function() {
    it("should return searched places", function(done) {
      this.timeout(5000);

      chai
        .request(app)
        .get("/place/search")
        .query({ word: "북촌" })
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(Array.isArray(res.body.searchedPlaceInfo)).to.equal(true);
          expect(res.body.isSearched).to.equal(true);
          done();
        });
    });
  });

  describe("GET /place/myplace/:user_id", function() {
    const userId = "5dd2c1101a1b3029717d4e5d";

    it("should return my places", function(done) {
      this.timeout(5000);

      chai
        .request(app)
        .get(`/place/myplace/${userId}`)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(Array.isArray(res.body)).to.equal(true);
          done();
        });
    });
  });

  describe("GET /place/:place_id", function() {
    const placeId = "5dde0256f3890c35f68cb3d4";

    it("should return the place details", function(done) {
      this.timeout(5000);

      chai
        .request(app)
        .get(`/place/${placeId}`)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(typeof res.body.placeDetails).to.equal("object");
          done();
        });
    });
  });
});
