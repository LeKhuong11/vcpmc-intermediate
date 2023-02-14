import React from 'react'
import Breadcrumbs from '../../../components/Breadcrumbs'
import root from '../support.module.scss'
import TabColumn from './components/TabColumn';

interface ITabData {
    title: string,
    key: number,
    content: string | number
}

function UserManualPage() {
    const TabData: ITabData[] = [
        {
            title: 'Lorem ipsum dolor sit amet',
            key: 1,
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Platea sit placerat odio lorem. Cum eleifend bibendum ipsum quis scelerisque dui nibh odio id. Nam cras nec non posuere etiam diam sed lacus lacus. In eget morbi eros, vitae enim nunc, cursus. Nisl eleifend lectus nunc massa aliquam, tellus in imperdiet. Malesuada suspendisse gravida tortor neque quis accumsan et posuere. Ac turpis urna ipsum pretium nisi aenean. Facilisis scelerisque placerat eget lorem eget maecenas. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Platea sit placerat odio lorem. Cum eleifend bibendum ipsum quis scelerisque dui nibh odio id. Nam cras nec non posuere etiam diam sed lacus lacus. In eget morbi eros, vitae enim nunc, cursus. Nisl eleifend lectus nunc massa aliquam, tellus in imperdiet. Malesuada suspendisse gravida tortor neque quis accumsan et posuere. Ac turpis urna ipsum pretium nisi aenean. Facilisis scelerisque placerat eget lorem eget maecenas. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Platea sit placerat odio lorem. Cum eleifend bibendum ipsum quis scelerisque dui nibh odio id. Nam cras nec non posuere etiam diam sed lacus lacus. In eget morbi eros, vitae enim nunc, cursus. Nisl eleifend lectus nunc massa aliquam, tellus in imperdiet. Malesuada suspendisse gravida tortor neque quis accumsan et posuere. Ac turpis urna ipsum pretium nisi aenean. Facilisis scelerisque placerat eget lorem eget maecenas. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Platea sit placerat odio lorem. Cum eleifend bibendum ipsum quis scelerisque dui nibh odio id. Nam cras nec non posuere etiam diam sed lacus lacus. In eget morbi eros, vitae enim nunc, cursus. Nisl eleifend lectus nunc massa aliquam, tellus in imperdiet. Malesuada suspendisse gravida tortor neque quis accumsan et posuere. Ac turpis urna ipsum pretium nisi aenean. Facilisis scelerisque placerat eget lorem eget maecenas:Lorem ipsum dolor sit amet, consectetur adipiscing elit. Platea sit placerat odio lorem. Cum eleifend bibendum ipsum quis scelerisque dui nibh odio id. Nam cras nec non posuere etiam. '
        },
        {
            title: 'Consectetur adipiscing elit sed do',
            key: 2,
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Platea sit placerat odio lorem. Cum eleifend bibendum ipsum quis scelerisque dui nibh odio id. Nam cras nec non posuere etiam.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Platea sit placerat odio lorem. Cum eleifend bibendum ipsum quis scelerisque dui nibh odio id. Nam cras nec non posuere etiam."
        },
        {
            title: 'Iusmod tempor incididunt ut labo',
            key: 3,
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Platea sit placerat odio lorem. Cum eleifend bibendum ipsum quis scelerisque dui nibh odio id. Nam cras nec non posuere etiam diam sed lacus lacus. In eget morbi eros, vitae enim nunc, cursus. Nisl eleifend lectus nunc massa aliquam, tellus in imperdiet. Malesuada suspendisse gravida tortor neque quis accumsan et posuere. Ac turpis urna ipsum pretium nisi aenean. Facilisis scelerisque placerat eget lorem eget maecenas. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
        },
        {
            title: 'Ut enim ad minim veniam',
            key: 4,
            content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.'
        },
        {
            title: 'Quis nostrud exercitation ullamco',
            key: 5,
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Platea sit placerat odio lorem. Cum eleifend bibendum ipsum quis scelerisque dui nibh odio id. Nam cras nec non posuere etiam diam sed lacus lacus. In eget morbi eros, vitae enim nunc, cursus. Nisl eleifend lectus nunc massa aliquam, tellus in imperdiet. Malesuada suspendisse gravida tortor neque quis accumsan et posuere. Ac turpis urna ipsum pretium nisi aenean. Facilisis scelerisque placerat eget lorem eget maecenas. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
        },
        {
            title: 'Excepteur sint occaecat cupidatats',
            key: 6,
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Platea sit placerat odio lorem. Cum eleifend bibendum ipsum quis scelerisque dui nibh odio id. Nam cras nec non posuere etiam diam sed lacus lacus. In eget morbi eros, vitae enim nunc, cursus. Nisl eleifend lectus nunc massa aliquam, tellus in imperdiet. Malesuada suspendisse gravida tortor neque quis accumsan et posuere. Ac turpis urna ipsum pretium nisi aenean. Facilisis scelerisque placerat eget lorem eget maecenas.'
        },
        {
            title: 'Sunt in culpa qui officiat',
            key: 7,
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Platea sit placerat odio lorem. Cum eleifend bibendum ipsum quis scelerisque dui nibh odio id. Nam cras nec non posuere etiam.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Platea sit placerat odio lorem. Cum eleifend bibendum ipsum quis scelerisque dui nibh odio id. Nam cras nec non posuere etiam.'
        },
        {
            title: 'Sed ut perspiciatis unde omnis iste',
            key: 8,
            content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.'
        },
    ]

  return (
    <div className={root.userManual}>
        <Breadcrumbs />
        <h3>Hướng dẫn sử dụng</h3>
        <div className={root.contentTab}>
            <TabColumn tabData={TabData} />
        </div>
    </div>
  )
}

export default UserManualPage