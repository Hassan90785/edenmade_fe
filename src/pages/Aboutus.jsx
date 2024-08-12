
import Carousel from 'react-multi-carousel';
export default function Aboutus() {
    const reviews = [
        {
            title: "BRIDAL SHOWER CATERING",
            text: "Ordered the stir fry noodles, fried fish, and suya chicken wings. Everyone loved it, and the service was top-notch!",
            author: "STA"
        },
        {
            title: "WEEKLY MEAL DELIVERY",
            text: "The meals are so convenient and delicious! I no longer have to worry about meal prep during my busy week.",
            author: "JDO"
        },
        {
            title: "FAMILY GATHERING",
            text: "The food was fantastic! The chicken was juicy, and the spices were perfect. Will definitely order again.",
            author: "RMB"
        },
        {
            title: "BIRTHDAY PARTY",
            text: "I ordered a custom menu for my son's birthday party, and everything was amazing. The kids especially loved the desserts!",
            author: "LKM"
        },
        {
            title: "HOLIDAY FEAST",
            text: "This holiday feast was a hit! The roast was tender, and the sides were flavorful. The whole family enjoyed it.",
            author: "AJH"
        },
        {
            title: "VEGETARIAN OPTIONS",
            text: "I was pleasantly surprised by the variety of vegetarian options available. The dishes were flavorful and satisfying.",
            author: "SRT"
        },
        {
            title: "ANNIVERSARY DINNER",
            text: "The anniversary dinner was perfect. The food was exquisite, and the presentation was beautiful. Thank you for making our evening special.",
            author: "WXY"
        },
        {
            title: "CORPORATE LUNCH",
            text: "We ordered a corporate lunch for our office, and everyone was impressed. The food was fresh, and the delivery was prompt.",
            author: "GHT"
        }
    ];

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3, // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2, // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
    };


    return (
        <div className="container-fluid my-5 position-relative">
            <div className="bg-wd"></div>
            <div className="bg-wm"></div>
            <div className="bg-dots dark"></div>
            <div className="container">

                <div className="row py-3 position-relative" style={{zIndex: 2}}>
                    <div className="col">
                        <h1 className="text-center my-3 aj-site-logo">Welcome to Edenmade</h1>
                        <p><strong>At Edenmade,</strong> we're passionate about bringing the joy of home-cooked meals back to your table.
                            Inspired by the bountiful flavors of nature and the satisfaction of a well-prepared dish,
                            we've
                            crafted a meal kit service that combines convenience with culinary excellence.</p>

                        <p>Imagine a weekly delivery of hand-selected, farm-fresh ingredients and chef-curated recipes,
                            tailored to suit your tastes and dietary preferences. Whether you're a busy professional, a
                            parent seeking nutritious family meals, or someone who simply loves to cook, Edenmade is
                            here to
                            simplify your kitchen experience and elevate your dining adventures.</p>

                        <p>Our commitment to quality is unwavering. We partner with local growers and suppliers to
                            ensure
                            that each ingredient meets our rigorous standards for freshness and sustainability. From
                            crisp
                            vegetables to tender meats and artisanal spices, every component of your Edenmade kit is
                            thoughtfully sourced and carefully packed.</p>
                        <section className="text-center my-4">
                            <img src="/edenmade/about-us%20(1).jpg" alt="about-us" className="img-fluid w-75"/>
                        </section>

                        <p>Here's how it works: browse our enticing menu of seasonal dishes, select your favorites, and
                            await your delivery. No more grocery store hassles or recipe planning—just delicious,
                            restaurant-quality meals waiting to be created in your own kitchen.</p>

                        <section className="text-center my-4">
                            <h1 className={'my-3'}>Don’t take our word for it, see what these families say about us.</h1>
                            <Carousel
                                responsive={responsive}
                                infinite={true}
                                autoPlay={true}
                                autoPlaySpeed={3000}
                                keyBoardControl={true}
                                customTransition="all .5"
                                transitionDuration={500}
                                containerClass="carousel-container"
                                removeArrowOnDeviceType={["tablet", "mobile"]}
                                dotListClass="custom-dot-list-style"
                                itemClass="carousel-item-padding-40-px"
                            >
                                {reviews.map((review, index) => (
                                    <div key={index} className="review-card">
                                        <h5 className={'fw-bold'}>{review.title}</h5>
                                        <p>{review.text}</p>
                                        <p>{review.author}</p>
                                        <div className="trustpilot" style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center'
                                        }}>
                                            <span className="tp-text fw-bold"><i className="fi fi-ss-star star"></i>Collected via Trustpilot</span>
                                        </div>
                                    </div>
                                ))}
                            </Carousel>
                        </section>

                        <p>Join us on a journey to rediscover the pleasure of cooking and savoring wholesome, flavorful
                            meals. Whether you're honing your culinary skills or discovering them anew, Edenmade is your
                            partner in culinary exploration and nourishment.</p>

                        <p>Welcome to a fresher, more inspired way of dining. Welcome to Edenmade.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
