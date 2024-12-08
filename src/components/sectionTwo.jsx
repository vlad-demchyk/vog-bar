function BannerDeal(){

    const bannerText = 'Breakfast Sets to Start Your Day Right'.toLocaleUpperCase

    const menuItems = [
        {
            imgUrl: '/images/menudeal1.png',
            title: 'Classic Italian Breakfast Set',
            par1: 'Cappuccino Delizioso A creamy cappuccino topped with rich foam.',
            par2: 'Avocado Toast Smashed avocado on toasted sourdough, drizzled with olive oil and sprinkled with sea salt.',
        },
        {
            imgUrl: '/images/menudeal2.png',
            title: 'Classic Italian Breakfast Set',
            par1: "Cappuccino Delizioso A creamy cappuccino topped with rich foam.",
            par2: 'Avocado Toast Smashed avocado on toasted sourdough, drizzled with olive oil and sprinkled with sea salt.'   
        },
        {
            imgUrl: '/images/menudeal3.png',
            title: 'Classic Italian Breakfast Set',
            par1: "Cappuccino Delizioso A creamy cappuccino topped with rich foam.",
            par2: 'Avocado Toast Smashed avocado on toasted sourdough, drizzled with olive oil and sprinkled with sea salt.'   
        }
    ]

return(
    <>
    <div className="banner-box">
        <h2>{bannerText}</h2>
        <div className="flex deal-menu">
            <div className="menu-item">
                <img src="#" alt="#" />
                <h2> #
                    <span>
                        #
                    </span>
                </h2>
            </div>
        </div>
    </div>
    </>
)

}

function DynamicMenu(){
    return (
        <>
        Menu will be Here!
        </>
    )
}


function SectionTwo(){

    return(
    <section>
  
    </section>
    )
}

export default SectionTwo;