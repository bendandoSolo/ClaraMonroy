import { forwardRef, useState } from "react";
import clsx from "clsx";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@ui/form-elements/input";
import Textarea from "@ui/form-elements/textarea";
import Feedback from "@ui/form-elements/feedback";
import Button from "@ui/button";
import { hasKey } from "@utils/methods";

type TProps = {
    className?: string;
};

type JsonResponse = {
    message: string;
  };

interface IFormValues {
    name: string;
    email: string;
    phone: string;
    message: string;
    to: string;
    website: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseJsonResponse(json: any): JsonResponse {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (typeof json.message === "string") {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return json;
    }
    throw new Error("Invalid JSON response");
  }
  
const ContactForm = forwardRef<HTMLFormElement, TProps>(
    ({ className }, ref) => {
        const [message, setMessage] = useState("");
        const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm<IFormValues>();

        function sendingAnimation() {
            const feedback = document.getElementById("feedback");
            const feedbackText = document.getElementById("feedback-text");
            feedback?.classList.add("pop-down");
            feedbackText?.classList.add("fade-in");
            setTimeout( () => {
                feedback?.classList.remove("pop-down");
                feedbackText?.classList.add("fade-out");
                feedback?.classList.add("pop-up");
            }, 1500);
            // eslint-disable-next-line func-names
            setTimeout( () => {
              feedback?.classList.remove("pop-up");
              feedbackText?.classList.remove("fade-out", "fade-in");
            }, 2500);
          }

        const onSubmit: SubmitHandler<IFormValues> = async (emailData) => {
            sendingAnimation();
            // eslint-disable-next-line no-console
            console.log(emailData);
            setMessage("Thank you for your message!");
             // eslint-disable-next-line no-console
            console.log("sending animation, error animation, success animation required");
            
            emailData.to = "enquiries@bendando.com";
            emailData.website = "bendando.com";
            const response = await fetch(
            "https://sendgridcsharp.azurewebsites.net/api/sendemail",
                {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(emailData),
                }
            );
            try {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const jsonResponse = await response.json();
                const bodyresponse = parseJsonResponse(jsonResponse);
                // const bodyresponse = (await response.json()) as JsonResponse;

                 // eslint-disable-next-line no-console
                 console.log(bodyresponse.message);
                // if (
                //     response.status === 200 &&
                //     bodyresponse.message != null &&
                //     bodyresponse.message === "Email Sent"
                // ) {
                //     // responseSuccessAnimation();
                // } else {
                //     // responseErrorAnimation();
                // }
                } catch (err) {

                    // eslint-disable-next-line no-console
                 console.log(message);
                // // responseErrorAnimation();
            }
        };

        


        return (
            <form
                className={clsx(className)}
                ref={ref}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="tw-grid tw-grid-cols-1 tw-gap-5 tw-mb-5 md:tw-grid-cols-2 md:tw-gap-7.5 md:tw-mb-7.5">
                    <div>
                        <label htmlFor="name" className="tw-sr-only">
                            Name
                        </label>
                        <Input
                            id="name"
                            placeholder="Your Name *"
                            bg="light"
                            feedbackText={errors?.name?.message}
                            state={hasKey(errors, "name") ? "error" : "success"}
                            showState={!!hasKey(errors, "name")}
                            {...register("name", {
                                required: "Name is required",
                            })}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="tw-sr-only">
                            email
                        </label>
                        <Input
                            type="email"
                            id="email"
                            placeholder="Your Email *"
                            bg="light"
                            feedbackText={errors?.email?.message}
                            state={
                                hasKey(errors, "email") ? "error" : "success"
                            }
                            showState={!!hasKey(errors, "email")}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "invalid email address",
                                },
                            })}
                        />
                    </div>
                </div>
                <div className="tw-mb-5 md:tw-mb-7.5">
                    <label htmlFor="phone" className="tw-sr-only">
                     Phone
                    </label>
                    <Input
                        id="phone"
                        placeholder="phone number *"
                        bg="light"
                        feedbackText={errors?.phone?.message}
                        state={hasKey(errors, "phone") ? "error" : "success"}
                        showState={!!hasKey(errors, "phone")}
                        {...register("phone", {
                            
                        })}
                    />
                </div>
                <div className="tw-mb-5 md:tw-mb-7.5">
                    <label htmlFor="message" className="tw-sr-only">
                        comment
                    </label>
                    <Textarea
                        id="message"
                        placeholder="Message"
                        bg="light"
                        feedbackText={errors?.message?.message}
                        state={hasKey(errors, "message") ? "error" : "success"}
                        showState={!!hasKey(errors, "message")}
                        {...register("message", {
                            required: "Message is required",
                        })}
                    />
                </div>
                <Button type="submit" className="tw-w-[180px]">
                    Submit
                </Button>
                {message && <Feedback state="success">{message}</Feedback>}
            </form>
        );
    }
);

export default ContactForm;
