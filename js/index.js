status = 'off';
strict = false;
timeouts = [];
sound1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
sound2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
sound3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
sound4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

$('#strict_button').on('click', function () {
	if (status == 'on') {
		if (document.getElementById('strict_button').checked) {
		strict = true;
		$('#strict_button').css('background-color', '#FF0000');
    } else {
			$('#strict_button').css('background-color', '#AA0000');
			strict = false;
		}
	}
})


var simonSays = simonSays || {

  high_score: 0,

  variables: function () {
    this.template = [];
    this.current_level = 1;
  },

  initialize: function () {
    if (status == 'on') {
      $('#score').css({'opacity': 1});
      $('#loss').css({'opacity': 1});
      $('#start').click(function () {
        simonSays.variables();
        $(this).off();
        simonSays.game.start();
      });
      $('#onoffbutton').on('click', simonSays.game.off);
    } else if (status == 'off') {
      $('#onoffbutton').on('click', function () {
    			$(this).animate({marginLeft: '-7%'}, 'fast');
    			status = 'on';
    			$(this).off();
    			simonSays.initialize();
    	})
    }

    }
}

simonSays.game = {

  randomColor: function () {
    var color = Math.floor((Math.random()*4)+1);
    return color;
  },
  getClass: function (value) {
    if (value == 1) {
        return 'one';
      } else if (value == 2) {
        return 'two';
      } else if (value == 3) {
        return 'three';
      } else if (value == 4) {
        return 'four';
      }
  },
  getSound: function (value) {
    if (value == 1) {
        return sound1;
      } else if (value == 2) {
        return sound2;
      } else if (value == 3) {
        return sound3;
      } else if (value == 4) {
        return sound4;
      }
  },
  moveDisplay: function (move, i) {
	  var classDisplay = simonSays.game.getClass(move),
        soundPlay = simonSays.game.getSound(move),
        timer = i * 900;
    timeouts.push(setTimeout(function() {
      $('#' + move).addClass(classDisplay);
      soundPlay.play();
      timeouts.push(setTimeout(function() {
      	$('#' + move).removeClass(classDisplay);

      }, 650));
    }, timer));

  },
  start: function () {
    var user_input = [];
    if (simonSays.template.length != simonSays.current_level) {
      simonSays.game.addMove();
    } else {
      for (i = 0; i < simonSays.template.length; i++) {
        simonSays.game.moveDisplay(simonSays.template[i], i);
      }
        simonSays.game.playerTurn(user_input);
      }
  },
  addMove: function () {
    var square = simonSays.game.randomColor();
    simonSays.template.push(square);
    simonSays.game.start();
  },

  playerTurn: function (user_input) {
    var player_moves = user_input,
        sound_time;

    $('.buttons').mousedown(function () {
      player_moves.push(this.id);
      classDisplay = simonSays.game.getClass(this.id);
      soundPlay = simonSays.game.getSound(this.id);
      $('#' + this.id).addClass(classDisplay);
      soundPlay.play();
      $(this).mouseup(function () {
        $('#' + this.id).removeClass(classDisplay);
      });
      $('.buttons').off('mousedown');
      var compare = simonSays.game.checkInput(player_moves);
      if (document.getElementById('strict_button').checked) {
			strict = true;
    } else (strict = false);
      if (compare === true) {
        if (player_moves.length === 20) {
          simonSays.high_score = (simonSays.current_level > simonSays.high_score) ? simonSays.current_level : simonSays.high_score;
          document.getElementById('score').innerHTML = simonSays.high_score;
          simonSays.game.winGame();
        } else if (player_moves.length === simonSays.template.length) {
          simonSays.high_score = (simonSays.current_level > simonSays.high_score) ? simonSays.current_level : simonSays.high_score;
          document.getElementById('score').innerHTML = simonSays.high_score;
          simonSays.current_level += 1;
          player_moves = [];
          timeouts.push(setTimeout(function() {
            simonSays.game.start();
          }, 1000));
        } else {
          simonSays.game.playerTurn(player_moves);
        }
      } else if (strict === false) {
        simonSays.game.tryAgain();
      } else {
        simonSays.game.endGame();
      }
    });
  },
  tryAgain: function () {
    $('#loss').removeClass('lose_message2');
    document.getElementById('loss').innerHTML = "Try Again.";
    $('#loss').addClass('lose_message1');
    timeouts.push(setTimeout(function() {
      $('#loss').removeClass('lose_message1');
  		document.getElementById('loss').innerHTML = "- - -";
      simonSays.game.start();
    }, 2000));
  },
  checkInput: function (player_moves) {
    var correct;
    for (i = 0; i < player_moves.length; i++) {
      if (player_moves[i] == simonSays.template[i]) {
        correct = true;
      } else {
        correct = false;
        break;
      }
    }
    return correct;
  },
  endGame: function () {
    $('#loss').removeClass('lose_message2');
		document.getElementById('loss').innerHTML = "YOU LOSE";
		$('#loss').addClass('lose_message1');
    $('#start').click(function () {
      simonSays.variables();
      simonSays.game.reset();
      simonSays.game.start();
    });
  },
  winGame: function () {
    $('#loss').removeClass('lose_message2');
		document.getElementById('loss').innerHTML = "YOU WIN!!!";
		$('#loss').addClass('lose_message1');
    var winterval = [];
    
    timeouts.push(setInterval(function () {
      $('#1').addClass('one');
      sound1.play();
      setTimeout(function() {
        $('#1').removeClass('one');
      }, 500);
    }, 2000));
    timeouts.push(setTimeout(function () {
      timeouts.push(setInterval(function () {
        $('#2').addClass('two');
        sound2.play();
        setTimeout(function() {
          $('#2').removeClass('two');
        }, 500);
      }, 2000));
    }, 500));
    timeouts.push(setTimeout(function () {
      timeouts.push(setInterval(function () {
        $('#3').addClass('three');
        sound3.play();
        setTimeout(function() {
          $('#3').removeClass('three');
        }, 500);
      }, 2000));
    }, 1000));
    timeouts.push(setTimeout(function () {
      timeouts.push(setInterval(function () {
        $('#4').addClass('four');
        sound4.play();
        setTimeout(function() {
          $('#4').removeClass('four');
        }, 500);
      }, 2000));
    }, 1500));
    
    $('#start').click(function () {
      clearInterval(winterval);
      simonSays.variables();
      simonSays.game.reset();
      simonSays.game.start();
		});
  },
  reset: function () {
    simonSays.high_score = 0;
    document.getElementById('score').innerHTML = simonSays.high_score;
    for (i = 1; i <= 4; i++) {
      $('#' + i).removeClass('one');
      $('#' + i).removeClass('two');
      $('#' + i).removeClass('three');
      $('#' + i).removeClass('four');
    }
    for (i = 0; i < timeouts.length; i++) {
      clearTimeout(timeouts[i]);
    }
    simonSays.variables();
    $('#loss').removeClass('lose_message1');
		document.getElementById('loss').innerHTML = "- - -";

    $('.buttons').off('click');
  },
	off: function () {
		status = 'off';
    $('#start').off();
		$('#onoffbutton').animate({marginLeft: '42%'}, 'fast');
    simonSays.variables();
		simonSays.game.reset();
		$('#strict_button').css('background-color', '#AA0000');
		strict = false;
		$('#score').css({'opacity': 0.25});
		$('#loss').css({'opacity': 0.25});
		document.getElementById('score').innerHTML = "-";
		$('#onoffbutton').on('click', function () {
		if (status == 'off') {
			$(this).animate({marginLeft: '-7%'}, 'fast');
			status = 'on';
			$(this).off();
			simonSays.initialize();
		}
	})
	}

}

$(document).ready(function () {
	$('#onoffbutton').on('click', function () {
			$(this).animate({marginLeft: '-7%'}, 'fast');
			status = 'on';
			$(this).off();
			simonSays.initialize();
	})
})