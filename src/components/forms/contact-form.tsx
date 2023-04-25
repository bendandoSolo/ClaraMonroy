import { forwardRef, useRef } from "react";
import clsx from "clsx";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@ui/form-elements/input";
import Textarea from "@ui/form-elements/textarea";
import Button from "@ui/button";
import { hasKey } from "@utils/methods";

type TProps = {
    className?: string;
};

interface IFormValues {
    name: string;
    email: string;
    phone: string;
    message: string;
    to: string;
    website: string;
}

type JsonResponse = {
    message: string;
  };
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
        // const [message, setMessage] = useState("");
        const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm<IFormValues>();

      const feedbackDiv = useRef<HTMLDivElement>(null);
      const feedbackText = useRef<HTMLParagraphElement>(null);
      const responseDiv = useRef<HTMLDivElement>(null);
      const responseText = useRef<HTMLParagraphElement>(null);

        function sendingAnimation() {
            if (feedbackDiv.current && feedbackText.current) {
            feedbackDiv.current?.classList.add("pop-down");
            feedbackText.current?.classList.add("fade-in");
            setTimeout( () => {
                feedbackDiv.current?.classList.remove("pop-down");
                feedbackText.current?.classList.add("fade-out");
                feedbackDiv.current?.classList.add("pop-up");
            }, 1500);
            setTimeout( () => {
              feedbackDiv.current?.classList.remove("pop-up");
              feedbackText.current?.classList.remove("fade-out", "fade-in");
            }, 2500);
            }
          }

          function responseAnimation(response: string): void {
            if (responseDiv.current && responseText.current) {
                responseDiv.current.classList.add("pop-down", "message-sent");
                responseText.current.classList.add("fade-in");
                if (response === "success")
                {
                    responseDiv.current.classList.add("tw-bg-success");
                    responseText.current.innerHTML = `Message Sent Successfully <i class="fas fa-check ms-2"></i>`;
                }
                else{
                    responseDiv.current.classList.add("tw-bg-danger");
                    responseText.current.innerHTML = `Error - Please Try Again <i class="fas fa-undo ms-2"></i>`;
                }
            }
          }

        const onSubmit: SubmitHandler<IFormValues> = async (emailData) => {
            // should debounce and reset form
            sendingAnimation();
            emailData.to = "hello@claramonroy.com";
            emailData.website = "claramonroy.com";
            const response = await fetch('https://csharpsendgridwithresponse.azurewebsites.net/api/SendGridWithResponseCSharp',
                {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(emailData),
                }
            );
            try {
                // const jsonResponse = ;
                const bodyresponse = parseJsonResponse(await response.json());
                if (
                    response.status === 200 &&
                    bodyresponse.message != null &&
                    bodyresponse.message === "Email Sent"
                ) {
                    responseAnimation("success");
                } else {
                    responseAnimation("fail");
                }
                } catch (err) {
                    responseAnimation("fail");
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
                <div className="tw-mb-3 md:tw-mb-3">
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
                <div ref={feedbackDiv} id="feedback" className='tw-bg-secondary'>
                    <p ref={feedbackText} id="feedback-text" >Sending...</p>
                </div>
                <div ref={responseDiv} id="response">
                    <p ref={responseText} id="response-text" />
                </div>
                <Button type="submit" className="tw-w-[180px]">
                    Submit
                </Button>
               
                {/* {message && <Feedback state="success">{message}</Feedback>} */}
            </form>
        );
    }
);

export default ContactForm;