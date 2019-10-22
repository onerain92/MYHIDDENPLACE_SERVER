exports.isSignedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(400).send("이메일과 비밀번호를 입력하세요.");
  }
};

exports.isNotSignedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(400).send("인증되어있습니다.");
  }
};
