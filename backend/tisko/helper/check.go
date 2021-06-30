package helper

import "fmt"

// WriteMassageAsError write massage to gefco.log
func WriteMassageAsError(s string) {
		WriteErr(fmt.Errorf(s))
}