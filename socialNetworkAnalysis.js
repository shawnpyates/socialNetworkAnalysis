var data = {
  f01: {
    name: "Alice",
    age: 15,
    follows: ["f02", "f03", "f04"]
  },
  f02: {
    name: "Bob",
    age: 20,
    follows: ["f05", "f06"]
  },
  f03: {
    name: "Charlie",
    age: 35,
    follows: ["f01", "f04", "f06"]
  },
  f04: {
    name: "Debbie",
    age: 40,
    follows: ["f01", "f02", "f03", "f05", "f06"]
  },
  f05: {
    name: "Elizabeth",
    age: 45,
    follows: ["f04"]
  },
  f06: {
    name: "Finn",
    age: 25,
    follows: ["f05"]
  }
};

// print user's name
function getName(user) {
  return data[user]["name"];
}

// for the given user, list followers by name
function listFollowers(user) {
  var followers = [];
  for (var key in data) {
    for (var i = 0; i < data[key]["follows"].length; i++) {
      if (data[key]["follows"][i] === user) {
        followers.push(data[key]["name"]);
      }
    }
  }
  return followers;
}

// for the given user, list who the user follows by name
function listFollowing(user) {
  var following = [];
  for (var i = 0; i < data[user]["follows"].length; i++) {
    following.push(data[data[user]["follows"][i]]["name"]);
  }
  return following;
}

// print for each user their names, their followers, and who they follow
function getAllInfo() {
  var output = "";
  for (var key in data) {
    output += "\n" + "Name: " + getName(key) + "\n";
    output += "Followers: " + listFollowers(key) + "\n";
    output += "Following: " + listFollowing(key) + "\n";
    output += "\n\n********************";
  }
  return output;
}


// print which user has the most followers
function usersWithMostFollowers() {
  var highestUserCount = 0;
  var usersWithMost = [];
  for (var key in data) {
    // check if a given user has the highest number of followers so far in the loop iteration (or higher)
    if (listFollowers(key).length >= highestUserCount) {
      // if true, and if the number is equal to highest number,
      // push user into existing array of users with most followers (because it's a "tie")
      if (listFollowers(key).length === highestUserCount) {
        usersWithMost.push(data[key]["name"]);
      }
      // if true, and the number is even higher than the highest number,
      // create a new array where this user stands alone as the user with the most followers
      else {
        highestUserCount = listFollowers(key).length;
        usersWithMost = [data[key]["name"]];
      }
    }
  }
  return "The user(s) with the most followers: " + usersWithMost;
}


// print which user follows the most users over 30
function usersFollowingMostOver30() {
  var usersWithMost = [];
  var mostFollowingOver30 = 0;
  for (var keyX in data) {
    data[keyX]["listOver30"] = [];
    // for each user, loop through the list of who they follow
    for (var i = 0; i < data[keyX]["follows"].length; i++) {
      // scan through the main list of users to identify matches on User A's "follows" array
      for (var keyY in data) {
        // when we find a match, check if the "followed" user is over 30
        if (keyY === data[keyX]["follows"][i] && data[keyY]["age"] > 30) {
          // if true, push the "followed" user into a new array that lists...
          // which members of User A's "follows" list are over 30
          data[keyX]["listOver30"].push(keyY);

        }
      }
    }
    // check to see whose "over 30" list has the most members
    if (data[keyX]["listOver30"].length >= mostFollowingOver30) {
      if (data[keyX]["listOver30"].length === mostFollowingOver30) {
        usersWithMost.push(data[keyX]["name"]);
      }
      else {
        mostFollowingOver30 = data[keyX]["listOver30"].length;
        usersWithMost = [data[keyX]["name"]];
      }
    }
    // return data[keyX]["listOver30"];
  }
  return "The user(s) following the most people over 30: " + usersWithMost;
}

// list which users follow another user who does not follow them back
function unreciprocatedLove(){
  var usersNotFollowedBack = [];
  for (var keyX in data) {
    data[keyX]["notFollowedBack"] = 0;
    // loop through a user's "follows" array
    for (var i = 0; i < data[keyX]["follows"].length; i++) {
      // for each member of User A's "follows" array, check to see if this member also follows User A
      for (var keyY in data) {
        if (data[keyX]["follows"][i] === keyY && !data[keyY]["follows"].includes(keyX)) {
          data[keyX]["notFollowedBack"]++;
        }
      }
    }
    // check who has unreciprocated "follows" and push them into new array
    if (data[keyX]["notFollowedBack"] > 0){
      usersNotFollowedBack.push(data[keyX]["name"]);
    }
  }
  // return data["f04"]["follows"].includes(data["f05"]);
  return "User(s) following at least one person who does not follow them back: " + usersNotFollowedBack;
}

console.log(getAllInfo());
console.log(usersWithMostFollowers());
console.log(usersFollowingMostOver30());
console.log(unreciprocatedLove());
