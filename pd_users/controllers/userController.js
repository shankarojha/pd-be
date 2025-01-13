const test = async (req,res) => {
    res.status(200).json([
        {
          user: "test",
          pass: "one",
        },
        {
          user: "test2",
          pass: "two",
        },
      ]);
};

module.exports = {
    test
}
