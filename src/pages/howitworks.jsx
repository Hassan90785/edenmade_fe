const Section = ({imageSrc, heading, text, buttonText, textOnLeft}) => {
    return (
        <section className={`section-how ${textOnLeft ? 'text-left' : 'text-right'}`}>
            <div className="content-container">
                <div className="text-content">
                    <h1 className={'my-3'}>{heading}</h1>
                    <p>{text}</p>
                    <button>{buttonText}</button>
                </div>
                <div className="image-content">
                    <img src={imageSrc} alt="section"/>
                </div>
            </div>
        </section>
    );
};
const IconSection = ({iconSrc, heading, text}) => {
    return (
        <section className="icon-section ">
            <div className="icon-container">
                <img src={iconSrc} alt="icon" className="icon-img ms-3"/>
            </div>
            <div className="text-content">
                <h2 className={'fw-bold'}>{heading}</h2>
                <p>{text}</p>
            </div>
        </section>
    );
};

export default function Howitworks() {
    return (
        <div className="container-fluid overflow-hidden my-5 position-relative about-us">
            <div className="bg-wd"></div>
            <div className="bg-wm"></div>
            <div className="bg-dots dark"></div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 className={'text-center my-3 aj-site-logo'}>How Edenmade Works</h1>
                    </div>
                </div>
                <div className="video-wrapper">
                    <div className="video-container">
                        <iframe
                            src="https://www.youtube.com/embed/0RD4kY0o9N8"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
                <Section
                    imageSrc="https://img.hellofresh.com/w_1920,q_auto,f_auto,c_limit,fl_lossy/hellofresh_website/us/cms/howitworks/hiw-plan.jpg"
                    heading="1. Pick a plan"
                    text="Whether cooking for yourself or your household, we have a flexible plan to match your lifestyle. Need to cancel, change meals, or skip a week? Not a problem."
                    buttonText="Get 60% off 1st box + free dessert for life!"
                    textOnLeft={true}
                />
                <Section
                    imageSrc="https://img.hellofresh.com/w_1920,q_auto,f_auto,c_limit,fl_lossy/hellofresh_website/us/cms/howitworks/hiw-delivery.jpg"
                    heading="2. Fresh ingredients delivered"
                    text="We deliver your step-by-step recipes and all the fresh pre-portioned ingredients you need, straight to your door."
                    buttonText="Get 60% off 1st box + free dessert for life!"
                    textOnLeft={false}
                />
                <Section
                    imageSrc="https://img.hellofresh.com/w_1920,q_auto,f_auto,c_limit,fl_lossy/hellofresh_website/us/cms/howitworks/hiw-family.jpg"
                    heading="3. Cook, eat, enjoy!"
                    text="The old “what do you want to eat?” conversation is about to be banished from your life. Welcome to a world where dinner is always planned, simple, and delicious."
                    buttonText="Get 60% off 1st box + free dessert for life!"
                    textOnLeft={true}
                />

                <div className="row">
                    <div className="col">
                        <h1 className={'text-center'}>Benefits</h1>
                    </div>
                </div>
                <div className="row my-5">
                    <div className="col-10 offset-md-2">
                        <div className="row">
                            <div className="col-md-6">
                                <IconSection
                                    iconSrc="https://cdn.hellofresh.com/us/how-it-works-fragment/hiw-benefits-icon-deliciousness.svg"  // Replace with your icon image URL
                                    heading="Deliciousness"
                                    text="Our chef-created recipes are tested 200 times to ensure your meals are as delicious to eat as they are easy to make."
                                />
                            </div>
                            <div className="col-md-6">
                                <IconSection
                                    iconSrc="https://cdn.hellofresh.com/us/how-it-works-fragment/hiw-benefits-icon-simplicity.svg"  // Replace with your icon image URL
                                    heading="Simplicity"
                                    text="From step-by-step recipes to no-hassle account changes, we make your life easier every way we can."
                                />
                            </div>
                            <div className="col-md-6">
                                <IconSection
                                    iconSrc="https://cdn.hellofresh.com/us/how-it-works-fragment/hiw-benefits-icon-flexibility.svg"  // Replace with your icon image URL
                                    heading="Flexibility"
                                    text="We accommodate every appetite, household size, and schedule. Need to skip a week or cancel? No problem."
                                />
                            </div>
                            <div className="col-md-6">
                                <IconSection
                                    iconSrc="https://cdn.hellofresh.com/us/how-it-works-fragment/hiw-benefits-icon-stress-free.svg"  // Replace with your icon image URL
                                    heading="Stress-free"
                                    text="Take back your evenings with fewer trips to the store, pre-planned meals, and little cleanup."
                                />
                            </div>
                            <div className="col-md-6">
                                <IconSection
                                    iconSrc="https://cdn.hellofresh.com/us/how-it-works-fragment/hiw-benefits-icon-dietarily-diverse.svg"  // Replace with your icon image URL
                                    heading="Dietarily diverse"
                                    text="Picky appetites welcome! Tell us what you like and don’t like, and we’ll recommend something delicious."
                                />
                            </div>
                            <div className="col-md-6">
                                <IconSection
                                    iconSrc="https://cdn.hellofresh.com/us/how-it-works-fragment/hiw-benefits-icon-no-waste.svg"  // Replace with your icon image URL
                                    heading="No waste"
                                    text="It’s easy being green with our pre-measured ingredients and recyclable materials."
                                />
                            </div>
                        </div>
                        <div className="row">

                            <div className="col">
                                <button className={'big-button w-100'}>Get 60% off 1st box + free dessert for life!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
