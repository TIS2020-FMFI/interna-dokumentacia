package helper

import "time"

// DurationToTomorow get how many times is to tomorow at 01:00:00
func DurationToTomorow() time.Duration {
	now := time.Now()
	tomorow :=time.Now().Add(24*time.Hour)
	tomorovAt01Hour := time.Date(tomorow.Year(), tomorow.Month(),
		tomorow.Day(),01,0,0,0,time.UTC)
	return tomorovAt01Hour.Sub(now)
}

// Synchronize wait to howMany signal from ch chan bool
func Synchronize(ch chan bool, howMany int) {
	for i := 0; i < howMany; i++ {
		<-ch
	}
}