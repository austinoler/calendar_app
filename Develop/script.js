$(document).ready(function() {
  // Function to save events to local storage.
  $(".saveBtn").on("click", function() {
    var timeBlockId = $(this).parent().attr("id");
    var eventText = $(this).siblings(".description").val();
    localStorage.setItem(timeBlockId, eventText);
  });

  // Function to load saved events from local storage.
  function loadEvents() {
    $(".time-block").each(function() {
      var timeBlockId = $(this).attr("id");
      var savedEvent = localStorage.getItem(timeBlockId);

      if (savedEvent) {
        $(this).find(".description").val(savedEvent);
      }
    });
  }

  loadEvents();

  // Function to update time-block classes based on the current time.
  function updateTimeBlockClasses() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function() {
      var timeBlockId = $(this).attr("id");
      var blockHour = parseInt(timeBlockId.split("-")[1]);
      $(this).removeClass("past present future");

      if (blockHour < currentHour) {
        $(this).addClass("past");
      } else if (blockHour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }

  updateTimeBlockClasses();

  // Function to display the current date in the header.
  function displayCurrentDate() {
    var currentDate = dayjs().format("dddd, MMMM D, YYYY");
    $("#currentDay").text("Today is " + currentDate);
  }

  displayCurrentDate();

  // Update time block classes every minute (optional).
  setInterval(updateTimeBlockClasses, 60000);
});