import * as yup from "yup";
import {EventType} from "../dto/EventType";
import moment from "moment";
import {yyyymmddthhMm} from "../util/DateUtil";

export type NewEventTabInputs = {
    title: string,
    info: string,
    type: EventType,
    location: string,
    startDate: string,
    endDate: string,
    alcoholicsIds: string[],
};

class NewEventTabValidation {

    static readonly defaultValues = {
        title: "",
        info: "",
        type: EventType.PUBLIC,
        location: "",
        startDate: "",
        endDate: "",
        alcoholicsIds: [],
    };

    static readonly schema = yup.object({
        title: yup.string()
            .required("Title is required")
            .max(50, "Title must be less than or equal to 50")
            .trim(),
        info: yup.string()
            .required("Information is required")
            .max(1000, "Information must be less than or equal to 1000")
            .trim(),
        location: yup.string()
            .required("Location is required")
            .max(200, "Location must be less than or equal to 200")
            .trim(),
        startDate: yup.string()
            .ensure()
            .required("Event Start Date is required")
            .test("lessThanTwoWeeks",
                "Event start date & time must be less than 14 days before now",
                startDate => moment().diff(moment(startDate, yyyymmddthhMm).valueOf(), "days") <= 14
            )
            .test("BeforeEndDate", "Event start date & time must be before Event end date & time", function (startDate) {
                    const endDate = this.parent.endDate;
                    const startDateString = startDate as string;
                    return endDate.length > 0 ? Date.parse(startDateString) < Date.parse(endDate) : true
                }
            ),
        endDate: yup.string()
            .ensure()
            .required("Event End Date is required")
            .test("withinTenYears",
                "Event End Date must be within 10 years",
                endDate => moment().add(10, "years").diff(moment(endDate, yyyymmddthhMm).valueOf(), "day") >= 1
            )
            .test("afterCurrentDate",
                "Event end date & time must be after the current date & time",
                endDate => moment(endDate, yyyymmddthhMm).valueOf() > moment().valueOf()
            )
            .test("afterStartDate", "Event End Date & time must be After Event Star Date & time", function (endDate) {
                    const startDate = this.parent.startDate;
                    const endDateString = endDate as string;
                    return startDate.length > 0 ? Date.parse(endDateString) > Date.parse(startDate) : true
                }
            ),
    });
}

export default NewEventTabValidation;
