/**
 * GET /
 */
exports.index = function(req, res) {
  console.log(process.argv[5])
  res.render('home', {
    title: 'Home'
  });
};
