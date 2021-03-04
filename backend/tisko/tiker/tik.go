package tiker

import "time"

type job struct {
	function     func()
	periodInHour time.Duration
	delay        time.Duration
}

var (
	jobs []*job
)

func AddNewJob(function func(), periodInHour int, delay time.Duration) {
	jobs = append(jobs,
		newJob(function, periodInHour, delay))
}

func newJob(function func(), periodInHour int, delay time.Duration) *job {
	return &job{
		function:     function,
		periodInHour: time.Hour * time.Duration(periodInHour),
		delay:        delay,
	}
}

func StartAll() {
	for i := 0; i < len(jobs); i++ {
		go StartJob(jobs[i])
	}
}

func StartJob(job *job) {
	time.Sleep(job.delay)
	for {
		go job.function()
		time.Sleep(job.periodInHour)
	}
}
