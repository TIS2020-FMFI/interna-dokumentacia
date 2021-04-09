package helper

import "time"

func DurationToTomorow() time.Duration {
	now := time.Now()
	tomorow :=time.Now().Add(24*time.Hour)
	tomorovAt01Hour := time.Date(tomorow.Year(), tomorow.Month(),
		tomorow.Day(),01,0,0,0,time.UTC)
	return tomorovAt01Hour.Sub(now)
}



func Synchronize(ch chan bool, howMany int) {
	for i := 0; i < howMany; i++ {
		<-ch
	}
}