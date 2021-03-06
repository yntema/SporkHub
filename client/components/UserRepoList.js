const React = require('react');
const UserRepoEntry = require('./UserRepoEntry');

class RepoList extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
    };
    
    // this.getRepos = this.getRepos.bind(this);
    
  }
 
  componentDidUpdate () {
    //Anytime the component renders, scroll to the top of the repo list
    $('.main-repo-view')[0].scrollTop = 0;
  }
  
  componentDidMount () {
    // this.getRepos();
  }
  
  render () {  
    //for really clean scrolling, we could do something like below to calculate the max height and then set the max height css 
    // var maxHeight = $(window).height() - $('.navbar').outerHeight() - margin * 2;
    return (
      <div>
        <div className="divider hide-on-large-only"></div>
        <div className="main-repo-view">
          {this.props.repos.map ((repo, index) => 
            <UserRepoEntry data={repo} key={index} username={this.props.username} refreshUserInfo={this.props.refreshUserInfo} />
          )}
        </div>
      </div>
    );  
  }
  
}

module.exports = RepoList;
